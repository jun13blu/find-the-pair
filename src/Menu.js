import React from 'react'
import {
  Container,
  Header,
  Transition,
  Divider,
  Button,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

export default class Menu extends React.Component {
  state = { visible: false }

  static propTypes = {
    name: string,
    mode: string,
    difficulty: string
  }

  componentDidMount() {
    this.setState({ visible: true })
  }

  handleMode = (e, { id }) => this.props.handleModeChange(id)

  handleDifficulty = (e, { id }) => this.props.handleDifficultyChange(id)

  render() {
    const { mode, difficulty } = this.props
    return (
      <Transition
        visible={this.state.visible}
        duration={1000}
        animation="fade up"
      >
        <Container style={{ width: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Welcome, {this.props.name}!
          </Header>
          <Segment vertical basic>
            <Divider horizontal>Mode</Divider>
            <Button.Group>
              <Button
                id="poker"
                color={mode === 'poker' ? 'green' : undefined}
                onClick={this.handleMode}
              >
                Poker
              </Button>
              <Button.Or />
              <Button
                id="mahjong"
                color={mode === 'mahjong' ? 'green' : undefined}
                onClick={this.handleMode}
              >
                Mahjong
              </Button>
            </Button.Group>
          </Segment>
          <Segment vertical basic>
            <Divider horizontal>Difficulty</Divider>
            <Button.Group>
              <Button
                id="tutorial"
                color={difficulty === 'tutorial' ? 'blue' : undefined}
                onClick={this.handleDifficulty}
              >
                Tutorial
              </Button>
              <Button.Or />
              <Button
                id="easy"
                color={difficulty === 'easy' ? 'teal' : undefined}
                onClick={this.handleDifficulty}
              >
                Easy
              </Button>
              <Button.Or />
              <Button
                id="normal"
                color={difficulty === 'normal' ? 'olive' : undefined}
                onClick={this.handleDifficulty}
              >
                Normal
              </Button>
              <Button.Or />
              <Button
                id="hard"
                color={difficulty === 'hard' ? 'orange' : undefined}
                onClick={this.handleDifficulty}
              >
                Hard
              </Button>
              <Button.Or />
              <Button
                id="challenging"
                color={difficulty === 'challenging' ? 'red' : undefined}
                onClick={this.handleDifficulty}
              >
                Challenging
              </Button>
            </Button.Group>
          </Segment>
          <Segment vertical basic>
            <Button as={Link} to="/game" color="teal" fluid size="large">
              Start
            </Button>
          </Segment>
        </Container>
      </Transition>
    )
  }
}
