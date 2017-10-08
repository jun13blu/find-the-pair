import React from 'react'
import {
  Segment,
  Reveal,
  Grid,
  Image,
  Header,
  Container,
  Modal,
  Button
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
    ready: false
  }

  static propTypes = {
    poker: object,
    name: string,
    mode: string,
    difficulty: string
  }

  componentDidMount() {
    this.setState({
      cards: this.getCardList(
        this.props.mode === 'poker'
          ? this.state.poker.front
          : this.state.mahjong.front,
        cardsNumber[this.props.difficulty]
      )
    })
  }

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

  checkWin = () =>
    this.state.reveal.length === this.state.cards.length
      ? fetch('https://hooks.zapier.com/hooks/catch/2557220/i6j5wx/', {
          method: 'post',
          body: JSON.stringify({
            name: this.props.name,
            steps: this.state.steps,
            mode: this.props.mode
          })
        })
      : {}

  render() {
    return (
      <Container>
        {this.state.ready ? (
          <Header as="h1" color="teal" textAlign="center">
            Steps: {this.state.steps}
          </Header>
        ) : (
          <Button color="teal" onClick={this.ready}>
            I'm Ready
          </Button>
        )}

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
            {this.state.cards.map(card => (
              <Grid.Column
                key={card.id}
                style={{
                  opacity: this.state.reveal.includes(card.id) ? 0 : undefined,
                  transition: 'opacity 0.5s'
                }}
              >
                <Reveal
                  animated="move up"
                  disabled={
                    this.state.first !== card.id &&
                    this.state.second !== card.id &&
                    !this.state.reveal.includes(card.id) &&
                    this.state.ready
                  }
                  active={
                    this.state.first === card.id ||
                    this.state.second === card.id ||
                    this.state.reveal.includes(card.id) ||
                    !this.state.ready
                  }
                  style={{ width: 'fit-content', margin: 'auto' }}
                >
                  <Reveal.Content visible>
                    <Image
                      className="card"
                      src={
                        this.props.mode === 'poker'
                          ? this.state.poker.back
                          : this.state.mahjong.back
                      }
                      size="small"
                      onClick={() => this.select(card.id)}
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

        <Modal open={this.state.reveal.length === this.state.cards.length}>
          <Modal.Header>Congratulations, {this.props.name}!</Modal.Header>
          <Modal.Content>
            <p>
              You've taken {this.state.steps} steps to find all the pairs. Good
              job!
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              as={Link}
              to="/menu"
              content="Continue"
              icon="right arrow"
              labelPosition="right"
            />
          </Modal.Actions>
        </Modal>
      </Container>
    )
  }
}
