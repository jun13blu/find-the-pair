import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Game from './Game'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import pokerBack from './images/poker/gray_back.png'
import mahjongBack from './images/mahjong/Back.png'

const importAll = r => {
  const images = {}
  r.keys().forEach((item, index) => {
    images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(item)
  })
  return images
}

const poker = {
  back: pokerBack,
  ...importAll(
    require.context('./images/poker/front', false, /\.(png|jpe?g|svg)$/)
  )
}

const mahjong = {
  back: mahjongBack,
  ...importAll(
    require.context('./images/mahjong/front', false, /\.(png|jpe?g|svg)$/)
  )
}

console.log(mahjong, poker)

class App extends Component {
  state = { name: '', mode: 'poker', difficulty: 'tutorial' }

  handleNameChange = name => this.setState({ name })

  handleModeChange = mode => this.setState({ mode })

  handleDifficultyChange = difficulty => this.setState({ difficulty })

  render() {
    const { name, mode, difficulty } = this.state
    return (
      <BrowserRouter>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    handleNameChange={this.handleNameChange}
                    name={name}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/menu"
                render={props =>
                  name ? (
                    <Menu
                      {...props}
                      name={name}
                      mode={mode}
                      difficulty={difficulty}
                      handleDifficultyChange={this.handleDifficultyChange}
                      handleModeChange={this.handleModeChange}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
              />
              <Route
                exact
                path="/game"
                render={props =>
                  name ? (
                    <Game
                      {...props}
                      mahjong={mahjong}
                      poker={poker}
                      mode={mode}
                      difficulty={difficulty}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
              />
              <Redirect to="/" />
            </Switch>
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    )
  }
}

export default App
