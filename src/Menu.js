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

  handleLanguage = (e, { id }) => this.props.handleLanguage(id)

  render() {
    const { mode, difficulty, language } = this.props
    const {
      welcome,
      modeLabel,
      poker,
      mahjong,
      difficulty: difficultyLabel,
      intro,
      easy,
      normal,
      hard,
      challenging,
      play,
      not,
      click,
      here
    } = language
    return (
      <Transition
        visible={this.state.visible}
        duration={1000}
        animation="fade up"
      >
        <Container style={{ width: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            {welcome}, {this.props.name}!
          </Header>
          <Segment vertical basic>
            <Divider horizontal>{modeLabel}</Divider>
            <Button.Group>
              <Button
                id="poker"
                color={mode === 'poker' ? 'green' : undefined}
                onClick={this.handleMode}
              >
                {poker}
              </Button>
              <Button.Or />
              <Button
                id="mahjong"
                color={mode === 'mahjong' ? 'green' : undefined}
                onClick={this.handleMode}
              >
                {mahjong}
              </Button>
            </Button.Group>
          </Segment>
          <Segment vertical basic>
            <Divider horizontal>{difficultyLabel}</Divider>
            <Button.Group>
              <Button
                id="tutorial"
                color={difficulty === 'tutorial' ? 'blue' : undefined}
                onClick={this.handleDifficulty}
              >
                {intro}
              </Button>
              <Button.Or />
              <Button
                id="easy"
                color={difficulty === 'easy' ? 'teal' : undefined}
                onClick={this.handleDifficulty}
              >
                {easy}
              </Button>
              <Button.Or />
              <Button
                id="normal"
                color={difficulty === 'normal' ? 'olive' : undefined}
                onClick={this.handleDifficulty}
              >
                {normal}
              </Button>
              <Button.Or />
              <Button
                id="hard"
                color={difficulty === 'hard' ? 'orange' : undefined}
                onClick={this.handleDifficulty}
              >
                {hard}
              </Button>
              <Button.Or />
              <Button
                id="challenging"
                color={difficulty === 'challenging' ? 'red' : undefined}
                onClick={this.handleDifficulty}
              >
                {challenging}
              </Button>
            </Button.Group>
          </Segment>
          <Segment vertical basic>
            <Button
              as={Link}
              to="/find-the-pair/game"
              color="teal"
              fluid
              size="large"
            >
              {play}
            </Button>
          </Segment>
          <p>
            {not} {this.props.name}? {click}{' '}
            <Link to="/find-the-pair/">{here}</Link>.
          </p>
        </Container>
      </Transition>
    )
  }
}
