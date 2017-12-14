import React from 'react'
import { Modal, Button, Divider } from 'semantic-ui-react'
import Slider from 'rc-slider'
import { string } from 'prop-types'

export default class Settings extends React.Component {
  static propTypes = {
    background: string
  }

  handleBackgroundColorChange = (e, { value }) =>
    this.props.handleBackgroundColorChange(value)

  handleLanguage = (e, { id }) => this.props.handleLanguage(id)

  handleVolume = volume => this.props.handleVolume(volume)

  render() {
    const { volume, language } = this.props
    const { settings, background, lang, languageLabel, volumeLabel } = language
    return (
      <Modal
        trigger={
          <Button
            circular
            icon="settings"
            floated="right"
            color="teal"
            style={{ position: 'absolute', top: 20, right: 20 }}
          />
        }
        size="tiny"
      >
        <Modal.Header>{settings}</Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Divider horizontal>{background}</Divider>
          <Button
            value="#f7f7f7"
            circular
            style={{ backgroundColor: '#f7f7f7' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Button
            value="#E4F4FA"
            circular
            style={{ backgroundColor: '#E4F4FA' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Button
            value="#FFFFCC"
            circular
            style={{ backgroundColor: '#FFFFCC' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Button
            value="#FFCCCC"
            circular
            style={{ backgroundColor: '#FFCCCC' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Button
            value="#FFCC99"
            circular
            style={{ backgroundColor: '#FFCC99' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Button
            value="#E8F1D4"
            circular
            style={{ backgroundColor: '#E8F1D4' }}
            onClick={this.handleBackgroundColorChange}
          />
          <Divider horizontal>{languageLabel}</Divider>
          <Button.Group>
            <Button
              id="english"
              color={lang === 'english' ? 'teal' : undefined}
              onClick={this.handleLanguage}
            >
              English
            </Button>
            <Button.Or />
            <Button
              id="malay"
              color={lang === 'malay' ? 'teal' : undefined}
              onClick={this.handleLanguage}
            >
              Melayu
            </Button>
            <Button.Or />
            <Button
              id="chinese"
              color={lang === 'chinese' ? 'teal' : undefined}
              onClick={this.handleLanguage}
            >
              华语
            </Button>
          </Button.Group>
          <Divider horizontal>{volumeLabel}</Divider>
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={volume}
            onChange={this.handleVolume}
          />
        </Modal.Content>
      </Modal>
    )
  }
}
