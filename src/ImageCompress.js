import React from 'react'
import base64toblob from 'base64toblob'

export default class ImageCompressor extends React.Component {
  state = {
    file: {},
    result: {},
    reader: {},
    imgSrc: '',
    scale: 100
  }

  _generateReader = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = this._fileOnLoad
    return reader
  }

  _handleChange = e => {
    const imgFile = e.target.files[0]
    if (imgFile) {
      const img = new Image()
      img.onload = () =>
        this.setState({
          file: imgFile,
          reader: this._generateReader(imgFile),
          scale: img.width > img.height ? 24000 / img.width : 24000 / img.height
        })
      img.src = window.URL.createObjectURL(imgFile)
    }
  }

  _drawImage = img => {
    let canvas = document.createElement('canvas')
    this.setState({ canvas }, () => {
      const scale = this.state.scale / 100
      const width = img.width * scale
      const height = img.height * scale
      this.state.canvas.setAttribute('width', width)
      this.state.canvas.setAttribute('height', height)
      this.state.canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      const quality = this.props.quality / 100
      const base64 = this.state.canvas.toDataURL('image/jpeg', quality)
      const { name } = this.state.result.file
      const lastDot = name.lastIndexOf('.')
      const fileName = name.substr(0, lastDot) + '.jpeg'
      const objToPass = {
        canvas: this.state.canvas,
        original: this.state.result,
        compressed: {
          blob: this._toBlob(base64),
          base64,
          name: fileName,
          file: this._buildFile(base64, fileName)
        }
      }

      objToPass.compressed.size =
        Math.round(objToPass.compressed.file.size / 1000) + ' kB'
      objToPass.compressed.type = 'image/jpeg'

      this.props.onDone(objToPass)
    })
  }

  _redraw = () =>
    this.state.result.base64 && this._drawImage(this.state.result.base64, true)

  _fileOnLoad = () => {
    const { file, reader } = this.state
    const { name, type, size } = file

    const result = {
      name: name,
      type: type,
      size: Math.round(size / 1000) + ' kb',
      base64: reader.result,
      file
    }

    const img = new Image()
    img.src = reader.result

    this.setState({ result }, () => (img.onload = () => this._drawImage(img)))
  }

  _toBlob = imgUrl =>
    window.URL.createObjectURL(base64toblob(imgUrl.split(',')[1], 'image/jpeg'))

  _buildFile = (blob, name) => new File([blob], name)

  componentWillReceiveProps(nextProps) {
    ;(this.props.quality !== nextProps.quality ||
      this.props.scale !== nextProps.scale) &&
      this._redraw()
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          style={{
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: '-1'
          }}
          onChange={this._handleChange}
        />
        <label htmlFor="file" className="ui green icon right labeled button">
          <i aria-hidden="true" className="up arrow icon" />
          Upload
        </label>
      </div>
    )
  }
}
