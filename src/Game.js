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
import { object, string } from 'prop-types'

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
    }
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

  select = id =>
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
                this.checkWin
              ),
            500
          )
        }
      }
    )

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

  checkWin = () => {
    if (this.state.reveal.length === this.state.cards.length) {
      const d = new Date()
      fetch('https://hooks.zapier.com/hooks/catch/2557220/i6j5wx/', {
        method: 'post',
        body: JSON.stringify({
          name: this.props.name,
          steps: this.state.steps,
          mode: this.props.mode,
          difficulty: this.props.difficulty,
          date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
          time: `${d.getHours()}:${d.getMinutes()}`,
          memorize: this.state.time.memory,
          game: this.state.time.game
        })
      })
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
      time
    } = this.state
    return (
      <Container>
        <Header as="h1" color="teal" textAlign="center">
          Steps: {steps}
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
          <Button color="red" as={Link} to="/find-the-pair/menu">
            Exit
          </Button>
        ) : (
          <Button color="teal" onClick={this.ready}>
            I'm Ready
          </Button>
        )}
        <Transition
          visible={reveal.length === cards.length}
          animation="fade up"
        >
          <Modal open={reveal.length === cards.length}>
            <Modal.Header>Congratulations, {this.props.name}!</Modal.Header>
            <Modal.Content>
              <p>You've taken {steps} steps to find all the pairs. Good job!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                as={Link}
                to="/find-the-pair/menu"
                content="Continue"
                icon="right arrow"
                labelPosition="right"
              />
            </Modal.Actions>
          </Modal>
        </Transition>
      </Container>
    )
  }
}
