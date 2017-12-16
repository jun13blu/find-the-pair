import React from 'react'
import { Modal, Button, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ImageCompress from './ImageCompress'

export default class Settings extends React.Component {
  componentWillReceiveProps(p) {
    console.log(p)
  }

  handlePhotoUpload = ({ compressed }) =>
    fetch(
      encodeURI(
        `https://script.google.com/macros/s/AKfycbyn6Vx1UXmWjLvDMuXY0DMpo9KVqYQx5cNF7kMqq2XfxnpCf9A/exec?type=upload&username=${
          this.props.name
        }&base64=${encodeURIComponent(compressed.base64)}`
      )
    )
      .then(res => res.json())
      .then(
        res =>
          res.result === 'success' && this.props.fetchPhotos(this.props.name)
      )
      .then(() => console.log(compressed.base64))

  render() {
    const { language, photos } = this.props
    const { photosLabel, play, upload } = language
    return (
      <Modal
        trigger={
          <Button color="teal" fluid size="large">
            {play}
          </Button>
        }
        size="large"
      >
        <Modal.Header>{photosLabel}</Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          {photos.length < 6 ? <p>Please upload at least 6 photos.</p> : null}
          <Grid columns={6} centered textAlign="center" verticalAlign="middle">
            {photos.map((photo, i) => (
              <Grid.Column key={i}>
                <img
                  className="ui centered fluid image"
                  src={photo.replace(' ', '')}
                />
              </Grid.Column>
            ))}
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            as={ImageCompress}
            content={upload}
            icon="up arrow"
            labelPosition="right"
            handlePhotoUpload={this.handlePhotoUpload}
            onDone={this.handlePhotoUpload}
            quality={30}
          />
          <Button
            color="green"
            as={Link}
            to="/find-the-pair/game"
            content={play}
            icon="play"
            labelPosition="right"
            disabled={photos.length < 6}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
