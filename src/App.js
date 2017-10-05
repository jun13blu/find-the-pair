import React, { Component } from 'react'
import { Transition, Container, Grid } from 'semantic-ui-react'
import Menu from './Menu'
import Game from './Game'
import logo from './logo.svg'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  state = {
    menu: true,
    game: false
  }

  toggleMenu = () => this.setState({ menu: !this.state.menu })
  toggleGame = () => this.setState({ game: !this.state.game })

  render() {
    const { game, menu } = this.state
    console.log(game)
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column>
          <Transition visible={menu} onHide={this.toggleGame}>
            <Container>
              <Menu toggle={this.toggleMenu} />
            </Container>
          </Transition>
          <Transition visible={game} onHide={this.toggleMenu}>
            <Container>
              <Game toggle={this.toggleGame} />
            </Container>
          </Transition>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
