import React from 'react'
import {
  Segment,
  Reveal,
  Grid,
  Image,
  Header,
  Container,
  Modal,
  Button,
  Transition
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Sound from 'react-sound'
import { object, string } from 'prop-types'
import click from './audio/click.mp3'
import correct from './audio/correct.mp3'
import win from './audio/win.mp3'
import wrong from './audio/wrong.mp3'

const cardsNumber = {
  tutorial: 4,
  easy: 6,
  normal: 8,
  hard: 10,
  challenging: 12
}

export default class Game extends React.Component {
  state = {
    first: '',
    second: '',
    reveal: [],
    steps: 0,
    poker: {
      back: this.props.poker.back,
      front: Object.entries(this.props.poker)
        .map(([key, value]) => ({
          type: key,
          src: value
        }))
        .filter(card => card.type !== 'back')
    },
    mahjong: {
      back: this.props.mahjong.back,
      front: Object.entries(this.props.mahjong)
        .map(([key, value]) => ({
          type: key,
          src: value
        }))
        .filter(card => card.type !== 'back')
    },
    cards: [],
    ready: false,
    time: {
      memory: 0,
      game: 0
    },
    sound: {
      click: false,
      correct: false,
      wrong: false,
      win: false
    },
    score: 0
  }

  static propTypes = {
    poker: object,
    name: string,
    mode: string,
    difficulty: string
  }

  componentDidMount() {
    this.setState(
      {
        cards: this.getCardList(
          this.props.mode === 'poker'
            ? this.state.poker.front
            : this.state.mahjong.front,
          cardsNumber[this.props.difficulty]
        )
      },
      this.timer
    )
  }

  timer = () =>
    this.state.reveal.length === this.state.cards.length ||
    setTimeout(
      () =>
        this.setState(
          {
            time: this.state.ready
              ? {
                  memory: this.state.time.memory,
                  game: this.state.time.game + 1
                }
              : {
                  memory: this.state.time.memory + 1,
                  game: this.state.time.game
                }
          },
          this.timer
        ),
      1000
    )

  select = id => {
    this.playSound('click')
    this.setState(
      {
        first: this.state.first || id,
        second: this.state.first && id,
        steps: this.state.steps + 1
      },
      () => {
        if (this.state.second) {
          const { first, second, reveal } = this.state
          setTimeout(
            () =>
              this.setState(
                {
                  first: '',
                  second: '',
                  reveal:
                    this.getCardType(first) === this.getCardType(second)
                      ? [...reveal, first, second]
                      : reveal
                },
                () => {
                  this.checkWin()
                  this.getCardType(first) === this.getCardType(second)
                    ? this.state.reveal.length === this.state.cards.length
                      ? this.playSound('win')
                      : this.playSound('correct')
                    : this.playSound('wrong')
                }
              ),
            500
          )
        }
      }
    )
  }

  getCardType = id => this.state.cards.find(card => card.id === id).type

  getCardList = (array, n) => {
    let cards = []
    while (cards.length < n / 2) {
      const random = array[Math.floor(Math.random() * array.length)]
      cards = cards.find(card => card.type === random.type)
        ? cards
        : [...cards, random]
    }

    cards = [...cards, ...cards]

    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i)
      ;[cards[i - 1], cards[j]] = [cards[j], cards[i - 1]]
    }

    return cards.map((card, i) => ({ id: (i += 1), ...card }))
  }

  ready = () => this.setState({ ready: true })

  peek = () => this.setState({ ready: false })

  checkWin = () => {
    if (this.state.reveal.length === this.state.cards.length) {
      const d = new Date()
      const { name, mode, difficulty } = this.props
      const { steps, time } = this.state
      const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
      const hour = `${d.getHours()}:${d.getMinutes()}`
      fetch(
        encodeURI(
          `https://script.google.com/macros/s/AKfycbyn6Vx1UXmWjLvDMuXY0DMpo9KVqYQx5cNF7kMqq2XfxnpCf9A/exec?name=${name}&steps=${steps}&mode=${mode}&difficulty=${difficulty}&memorize=${time.memory}&game=${time.game}&date=${date}&time=${hour}`
        )
      )
    }
  }

  format = time => {
    const hour = time / 3600
    const min = (time % 3600) / 60
    const sec = time % 60
    return `${hour > 9 ? hour.toFixed(0) : `0${hour.toFixed(0)}`}:${min > 9
      ? min.toFixed(0)
      : `0${min.toFixed(0)}`}:${sec > 9 ? sec : `0${sec}`}`
  }

  playSound = sound =>
    this.setState({ sound: { ...this.state.sound, [sound]: false } }, () =>
      this.setState({
        sound: { ...this.state.sound, [sound]: true },
        score:
          sound === 'correct' || sound === 'win'
            ? this.state.score +
              Number.parseInt(
                1500 / (this.state.time.game + this.state.time.memory / 2),
                10
              )
            : this.state.score
      })
    )

  render() {
    const {
      first,
      second,
      reveal,
      steps,
      cards,
      ready,
      poker,
      mahjong,
      time,
      sound,
      score
    } = this.state
    const {
      scoreLabel,
      peek,
      readyLabel,
      congrats,
      success,
      steps: stepsLabel,
      peekTime,
      gameTime,
      totalTime,
      continueLabel
    } = this.props.language
    return (
      <Container>
        <Header as="h1" color="teal" textAlign="center">
          {scoreLabel}: {score}
          <Header.Subheader>
            {this.format(time.memory)} | {this.format(time.game)}
          </Header.Subheader>
        </Header>

        <Segment>
          <Grid
            textAlign="center"
            verticalAlign="middle"
            columns={
              cardsNumber[this.props.difficulty] > 6
                ? cardsNumber[this.props.difficulty] / 2
                : cardsNumber[this.props.difficulty]
            }
          >
            {cards.map(card => (
              <Grid.Column
                key={card.id}
                style={{
                  opacity: reveal.includes(card.id) ? 0 : undefined,
                  transition: 'opacity 0.5s'
                }}
              >
                <Reveal
                  animated="move up"
                  disabled={
                    first !== card.id &&
                    second !== card.id &&
                    !reveal.includes(card.id) &&
                    ready
                  }
                  active={
                    first === card.id ||
                    second === card.id ||
                    reveal.includes(card.id) ||
                    !ready
                  }
                  style={{ width: 'fit-content', margin: 'auto' }}
                >
                  <Reveal.Content
                    visible
                    className={second ? undefined : 'card-reveal'}
                  >
                    <Image
                      className={second ? undefined : 'card'}
                      src={
                        this.props.mode === 'poker' ? poker.back : mahjong.back
                      }
                      size="small"
                      onClick={second ? undefined : () => this.select(card.id)}
                    />
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Image src={card.src} size="small" />
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
        {ready ? (
          <Button primary onClick={this.peek}>
            {peek}
          </Button>
        ) : (
          <Button color="teal" onClick={this.ready}>
            {readyLabel}
          </Button>
        )}
        <Transition
          visible={reveal.length === cards.length}
          animation="fade up"
        >
          <Modal open={reveal.length === cards.length}>
            <Modal.Header>
              {congrats}, {this.props.name}!
            </Modal.Header>
            <Modal.Content>
              <Header color="teal">
                {scoreLabel}: {score}
              </Header>
              <p>{success}</p>
              <p>
                {stepsLabel}: {steps}
              </p>
              <p>
                {peekTime}: {this.format(time.memory)}
              </p>
              <p>
                {gameTime}: {this.format(time.game)}
              </p>
              <p>
                {totalTime}: {this.format(time.memory + time.game)}
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                as={Link}
                to="/find-the-pair/menu"
                content={continueLabel}
                icon="right arrow"
                labelPosition="right"
              />
            </Modal.Actions>
          </Modal>
        </Transition>
        <Button
          color="red"
          as={Link}
          to="/find-the-pair/menu"
          circular
          icon="arrow left"
          style={{ position: 'fixed', top: 20, left: 20 }}
        />
        <Sound
          url={click}
          playStatus={sound.click ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={100}
          autoLoad
        />
        <Sound
          url={wrong}
          playStatus={sound.wrong ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={100}
          autoLoad
        />
        <Sound
          url={correct}
          playStatus={
            sound.correct ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          volume={100}
          autoLoad
        />
        <Sound
          url={win}
          playStatus={sound.win ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={50}
          autoLoad
        />
      </Container>
    )
  }
}
