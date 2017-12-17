import React from 'react'
import { Modal, Button, Grid, Image, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ImageCompress from './ImageCompress'

export default class Settings extends React.Component {
  state = {
    loading: false,
    error: false
  }

  handlePhotoUpload = ({ compressed }) =>
    this.setState({ loading: true, error: false }, () =>
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
            res.result === 'success' &&
            this.props.fetchPhotos(this.props.name, () =>
              this.setState({ loading: false })
            )
        )
        .catch(this.handleError)
    )

  handleError = () => {
    const photosLength = this.props.photos.length
    this.props.fetchPhotos(this.props.name, () =>
      this.setState(
        { error: this.props.photos.length == photosLength, loading: false },
        () =>
          this.props.photos.length == photosLength &&
          setTimeout(() => this.setState({ error: false }), 5000)
      )
    )
  }

  render() {
    const loading = this.props.loading || this.state.loading
    const { error } = this.state
    const { language, photos } = this.props
    const { photosLabel, play, upload, uploadWarning, errorWarning } = language
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
          <Segment loading={loading} basic>
            {photos.length < 6 ? <p>{uploadWarning}</p> : null}
            {error ? <p style={{ color: 'red' }}>{errorWarning}</p> : null}
            <Grid
              columns={6}
              centered
              textAlign="center"
              verticalAlign="middle"
            >
              {photos.map((photo, i) => (
                <Grid.Column key={i}>
                  <img
                    className="ui centered fluid image"
                    src={photo.replace(' ', '')}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            as={ImageCompress}
            upload={upload}
            icon="up arrow"
            labelPosition="right"
            handlePhotoUpload={this.handlePhotoUpload}
            onDone={this.handlePhotoUpload}
            quality={30}
            disabled={loading}
          />
          <Button
            color="green"
            as={Link}
            to="/find-the-pair/game"
            content={play}
            icon="play"
            labelPosition="right"
            disabled={photos.length < 6 || loading}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
