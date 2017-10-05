import React from 'react'
import { Segment, Reveal, Grid, Image } from 'semantic-ui-react'
import logo from './logo.svg'

const cards = [
  { id: 1, type: 'a', src: logo },
  { id: 2, type: 'b', src: logo },
  { id: 3, type: 'a', src: logo },
  { id: 4, type: 'c', src: logo }
]

export default class Game extends React.Component {
  state = {
    first: '',
    second: '',
    reveal: [],
    steps: 0
  }

  select = id =>
    this.setState(
      {
        first: this.state.first || id,
        second: this.state.first && id,
        steps: this.state.steps + 1
      },
      () => {
        console.log(this.state)
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
                () => console.log(this.state)
              ),
            1000
          )
        }
      }
    )

  deselect = id =>
    this.state.first === id &&
    this.setState({ first: '', steps: this.state.steps + 1 }, () =>
      console.log(this.state)
    )

  getCardType = id => cards.find(card => card.id === id).type

  render() {
    return (
      <Segment>
        <Grid columns={6}>
          {cards.map(card => (
            <Grid.Column key={card.id}>
              <Reveal
                animated="move up"
                disabled={
                  this.state.first !== card.id &&
                  this.state.second !== card.id &&
                  !this.state.reveal.includes(card.id)
                }
                active={
                  this.state.first === card.id ||
                  this.state.second === card.id ||
                  this.state.reveal.includes(card.id)
                }
              >
                <Reveal.Content visible>
                  <Image
                    src={card.src}
                    size="small"
                    onClick={() => this.select(card.id)}
                  />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Image
                    src={card.src}
                    size="small"
                    onClick={() => this.deselect(card.id)}
                  />
                </Reveal.Content>
              </Reveal>
            </Grid.Column>
          ))}
        </Grid>
        Steps: {this.state.steps}
      </Segment>
    )
  }
}
