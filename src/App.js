import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Game from './Game'
import Settings from './Settings'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import pokerBack from './images/poker/gray_back-min.png'
import mahjongBack from './images/mahjong/face-down-128px-min.png'

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

class App extends Component {
  state = {
    name: '',
    mode: 'poker',
    difficulty: 'tutorial',
    background: '#f7f7f7'
  }

  handleNameChange = name => this.setState({ name })

  handleModeChange = mode => this.setState({ mode })

  handleDifficultyChange = difficulty => this.setState({ difficulty })

  handleBackgroundColorChange = background => this.setState({ background })

  render() {
    const { name, mode, difficulty } = this.state
    return (
      <BrowserRouter>
        <div style={{ height: '100%', backgroundColor: this.state.background }}>
          <Settings
            handleBackgroundColorChange={this.handleBackgroundColorChange}
          />
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Switch>
                <Route
                  exact
                  path="/find-the-pair"
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
                  path="/find-the-pair/menu"
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
                      <Redirect to="/find-the-pair" />
                    )}
                />
                <Route
                  exact
                  path="/find-the-pair/game"
                  render={props =>
                    name ? (
                      <Game
                        {...props}
                        name={name}
                        mahjong={mahjong}
                        poker={poker}
                        mode={mode}
                        difficulty={difficulty}
                      />
                    ) : (
                      <Redirect to="/find-the-pair" />
                    )}
                />
                <Redirect to="/find-the-pair" />
              </Switch>
            </Grid.Column>
          </Grid>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
