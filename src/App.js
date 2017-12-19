import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Sound from 'react-sound'
import Home from './Home'
import Menu from './Menu'
import Game from './Game'
import Settings from './Settings'
import language from './lang.json'
import pokerBack from './images/poker/gray_back-min.png'
import mahjongBack from './images/mahjong/face-down-128px-min.png'
import bgm from './audio/bgm.mp3'
import 'semantic-ui-css/semantic.min.css'
import 'rc-slider/assets/index.css'
import './App.css'

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
    background: '#f7f7f7',
    play: true,
    language: language.english,
    volume: 10,
    photos: []
  }

  handleNameChange = name =>
    this.setState({
      name,
      photos: [],
      mode: 'poker',
      difficulty: 'tutorial'
    })

  handleModeChange = mode => this.setState({ mode })

  handleDifficultyChange = difficulty => this.setState({ difficulty })

  handleBackgroundColorChange = background => this.setState({ background })

  handleLanguage = lang => this.setState({ language: language[lang] })

  handleVolume = volume => this.setState({ volume })

  handlePhotos = photos => this.setState({ photos })

  replay = () =>
    this.setState({ play: false }, () => this.setState({ play: true }))

  render() {
    const { name, mode, difficulty, language, volume, photos } = this.state
    return (
      <BrowserRouter>
        <div style={{ height: '100%', backgroundColor: this.state.background }}>
          <Settings
            handleBackgroundColorChange={this.handleBackgroundColorChange}
            handleLanguage={this.handleLanguage}
            handleVolume={this.handleVolume}
            language={language}
            volume={volume}
          />
          <Sound
            url={bgm}
            playStatus={
              this.state.play ? Sound.status.PLAYING : Sound.status.STOPPED
            }
            volume={volume}
            onFinishedPlaying={this.replay}
            autoLoad
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
                      language={language}
                      handleLanguage={this.handleLanguage}
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
                        language={language}
                        name={name}
                        mode={mode}
                        difficulty={difficulty}
                        handleDifficultyChange={this.handleDifficultyChange}
                        handleModeChange={this.handleModeChange}
                        handlePhotos={this.handlePhotos}
                        photos={photos}
                      />
                    ) : (
                      <Redirect to="/find-the-pair" />
                    )
                  }
                />
                <Route
                  exact
                  path="/find-the-pair/game"
                  render={props =>
                    name ? (
                      <Game
                        {...props}
                        language={language}
                        name={name}
                        mahjong={mahjong}
                        poker={poker}
                        mode={mode}
                        difficulty={difficulty}
                        volume={volume}
                        photos={photos}
                      />
                    ) : (
                      <Redirect to="/find-the-pair" />
                    )
                  }
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
