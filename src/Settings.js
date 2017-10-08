import React from 'react'
import { Modal, Button, Divider } from 'semantic-ui-react'
import { string } from 'prop-types'

export default class Settings extends React.Component {
  static propTypes = {
    background: string
  }

  handleBackgroundColorChange = (e, { value }) =>
    this.props.handleBackgroundColorChange(value)

  render() {
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
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Divider horizontal>Background</Divider>
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
        </Modal.Content>
      </Modal>
    )
  }
}
