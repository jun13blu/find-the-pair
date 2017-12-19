import React from 'react'
import ReactDOM from 'react-dom'
import base64toblob from 'base64toblob'
import {
  Grid,
  Container,
  Header,
  Transition,
  Divider,
  Button,
  Segment,
  Modal,
  Button,
  Image
} from 'semantic-ui-react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import Sound from 'react-sound'
import pokerBack from './images/poker/gray_back-min.png'
import mahjongBack from './images/mahjong/face-down-128px-min.png'
import bgm from './audio/bgm.mp3'
import click from './audio/click.mp3'
import correct from './audio/correct.mp3'
import win from './audio/win.mp3'
import wrong from './audio/wrong.mp3'
import photosBack from './images/photosBack.png'

const language = {
  english: {
    lang: 'english',
    title: 'Find The Pair',
    placeholder: 'Enter your name',
    start: 'Start',
    welcome: 'Welcome',
    modeLabel: 'Mode',
    poker: 'Poker',
    mahjong: 'Mahjong',
    difficulty: 'Difficulty',
    intro: 'Intro',
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
    challenging: 'Challenging',
    play: 'Play',
    not: 'Not',
    click: 'Click',
    here: 'here',
    settings: 'Settings',
    background: 'Background',
    scoreLabel: 'Score',
    peek: 'Peek',
    readyLabel: "I'm Ready",
    congrats: 'Congratulation',
    success: 'You found all the pairs. Good job!',
    steps: 'Steps taken',
    peekTime: 'Peek time',
    gameTime: 'Game time',
    totalTime: 'Total time',
    continueLabel: 'Continue',
    languageLabel: 'Language',
    volumeLabel: 'Volume',
    photosLabel: 'Photos',
    upload: 'Upload',
    uploadWarning: 'Please upload at least 6 photos.',
    errorWarning:
      'Error uploading photo. Please try uploading photo with smaller size.'
  },
  chinese: {
    lang: 'chinese',
    title: '配配对',
    placeholder: '请输入您的名字',
    start: '确定',
    welcome: '您好',
    modeLabel: '模式',
    poker: '扑克牌',
    mahjong: '麻将牌',
    difficulty: '难度',
    intro: '初级',
    easy: '简单',
    normal: '普通',
    hard: '困难',
    challenging: '挑战',
    play: '开始游戏',
    not: '不是',
    click: '点击',
    here: '这里',
    settings: '设置',
    background: '背景',
    scoreLabel: '分数',
    peek: '看牌',
    readyLabel: '准备好了',
    congrats: '恭喜',
    success: '您找到了所有配对。真不错！',
    steps: '步数',
    peekTime: '记忆时间',
    gameTime: '配对时间',
    totalTime: '总时间',
    continueLabel: '继续',
    languageLabel: '语言',
    volumeLabel: '声量',
    photosLabel: '照片',
    upload: '上传',
    uploadWarning: '请上传至少六张照片。',
    errorWarnign: '请上传文件大小比较小的照片。'
  },
  malay: {
    lang: 'malay',
    title: 'Carilah Pasangan',
    placeholder: 'Masukkan nama anda',
    start: 'Mula',
    welcome: 'Selamat Datang',
    modeLabel: 'Mod',
    poker: 'Poker',
    mahjong: 'Mahjong',
    difficulty: 'Kesukaran',
    intro: 'Pengenalan',
    easy: 'Senang',
    normal: 'Biasa',
    hard: 'Susah',
    challenging: 'Cabaran',
    play: 'Main',
    not: 'Bukan',
    click: 'Tekan',
    here: 'sini',
    settings: 'Tetapan',
    background: 'Latar Belakang',
    scoreLabel: 'Markah',
    peek: 'Tengok',
    readyLabel: 'Sedia',
    congrats: 'Tahniah',
    success: 'Anda sudah carikan semua pasangan. Syabas!',
    steps: 'Langkah',
    peekTime: 'Masa mengingati',
    gameTime: 'Masa memain',
    totalTime: 'Jumlah masa',
    continueLabel: 'Teruskan',
    languageLabel: 'Bahasa',
    volumeLabel: 'Suara',
    photosLabel: 'Gambar',
    upload: 'Muat Naik',
    uploadWarning: 'Sila muat naik sekurang-kurangnya enam keping gambar.',
    errorWarning: 'Saiz fail untuk gambar yang dipilih terlalu besar.'
  }
}

const cardsNumber = {
  tutorial: 4,
  easy: 6,
  normal: 8,
  hard: 10,
  challenging: 12
}

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

class App extends React.Component {
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

  handleNameChange = name => this.setState({ name, photos: [] })

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

class Menu extends React.Component {
  state = { visible: false, loading: true }

  static propTypes = {
    name: string,
    mode: string,
    difficulty: string
  }

  componentDidMount() {
    this.setState({ visible: true }, () => this.fetchPhotos(this.props.name))
  }

  fetchPhotos = (name, cb) =>
    fetch(
      encodeURI(
        `https://script.google.com/macros/s/AKfycbyn6Vx1UXmWjLvDMuXY0DMpo9KVqYQx5cNF7kMqq2XfxnpCf9A/exec?type=retrieve&username=${name}`
      )
    )
      .then(res => res.json())
      .then(res => res.base64.map(base64 => decodeURIComponent(base64)))
      .then(photos => this.props.handlePhotos(photos))
      .then(() => this.setState({ loading: false }, () => cb && cb()))

  handleMode = (e, { id }) => this.props.handleModeChange(id)

  handleDifficulty = (e, { id }) => this.props.handleDifficultyChange(id)

  handleLanguage = (e, { id }) => this.props.handleLanguage(id)

  render() {
    const { loading } = this.state
    const { mode, difficulty, language, photos, name } = this.props
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
      here,
      photosLabel
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
                color={mode === 'poker' ? 'teal' : undefined}
                onClick={this.handleMode}
              >
                {poker}
              </Button>
              <Button.Or />
              <Button
                id="mahjong"
                color={mode === 'mahjong' ? 'teal' : undefined}
                onClick={this.handleMode}
              >
                {mahjong}
              </Button>
              <Button.Or />
              <Button
                id="photos"
                color={mode === 'photos' ? 'teal' : undefined}
                onClick={this.handleMode}
              >
                {photosLabel}
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
            {mode === 'photos' ? (
              <Upload
                photos={photos}
                language={language}
                name={name}
                fetchPhotos={this.fetchPhotos}
                loading={loading}
              />
            ) : (
              <Button
                as={Link}
                to="/find-the-pair/game"
                color="teal"
                fluid
                size="large"
              >
                {play}
              </Button>
            )}
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

class Settings extends React.Component {
  state = {
    loading: false,
    error: false
  }

  handlePhotoUpload = ({ compressed }) =>
    this.setState({ loading: true, error: false }, () =>
      fetch(
        encodeURI(
          `https://script.google.com/macros/s/AKfycbyn6Vx1UXmWjLvDMuXY0DMpo9KVqYQx5cNF7kMqq2XfxnpCf9A/exec?type=upload&username=${
            this.props.name
          }&base64=${encodeURIComponent(compressed.base64)}`
        )
      )
        .then(res => res.json())
        .then(
          res =>
            res.result === 'success' &&
            this.props.fetchPhotos(this.props.name, () =>
              this.setState({ loading: false })
            )
        )
        .catch(this.handleError)
    )

  handleError = () => {
    const photosLength = this.props.photos.length
    this.props.fetchPhotos(this.props.name, () =>
      this.setState(
        { error: this.props.photos.length == photosLength, loading: false },
        () =>
          this.props.photos.length == photosLength &&
          setTimeout(() => this.setState({ error: false }), 5000)
      )
    )
  }

  render() {
    const loading = this.props.loading || this.state.loading
    const { error } = this.state
    const { language, photos } = this.props
    const { photosLabel, play, upload, uploadWarning, errorWarning } = language
    return (
      <Modal
        trigger={
          <Button color="teal" fluid size="large">
            {play}
          </Button>
        }
        size="large"
      >
        <Modal.Header>{photosLabel}</Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Segment loading={loading} basic>
            {photos.length < 6 ? <p>{uploadWarning}</p> : null}
            {error ? <p style={{ color: 'red' }}>{errorWarning}</p> : null}
            <Grid
              columns={6}
              centered
              textAlign="center"
              verticalAlign="middle"
            >
              {photos.map((photo, i) => (
                <Grid.Column key={i}>
                  <img
                    className="ui centered fluid image"
                    src={photo.replace(' ', '')}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            as={ImageCompress}
            upload={upload}
            icon="up arrow"
            labelPosition="right"
            handlePhotoUpload={this.handlePhotoUpload}
            onDone={this.handlePhotoUpload}
            quality={30}
            disabled={loading}
          />
          <Button
            color="green"
            as={Link}
            to="/find-the-pair/game"
            content={play}
            icon="play"
            labelPosition="right"
            disabled={photos.length < 6 || loading}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

class ImageCompressor extends React.Component {
  state = {
    file: {},
    result: {},
    reader: {},
    imgSrc: '',
    scale: 100
  }

  _generateReader = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = this._fileOnLoad
    return reader
  }

  _handleChange = e => {
    const imgFile = e.target.files[0]
    if (imgFile) {
      const img = new Image()
      img.onload = () =>
        this.setState({
          file: imgFile,
          reader: this._generateReader(imgFile),
          scale: img.width > img.height ? 20000 / img.width : 20000 / img.height
        })
      img.src = window.URL.createObjectURL(imgFile)
    }
  }

  _drawImage = img => {
    let canvas = document.createElement('canvas')
    this.setState({ canvas }, () => {
      const scale = this.state.scale / 100
      const width = img.width * scale
      const height = img.height * scale
      this.state.canvas.setAttribute('width', width)
      this.state.canvas.setAttribute('height', height)
      this.state.canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      const quality = this.props.quality / 100
      const base64 = this.state.canvas.toDataURL('image/jpeg', quality)
      const { name } = this.state.result.file
      const lastDot = name.lastIndexOf('.')
      const fileName = name.substr(0, lastDot) + '.jpeg'
      const objToPass = {
        canvas: this.state.canvas,
        original: this.state.result,
        compressed: {
          blob: this._toBlob(base64),
          base64,
          name: fileName,
          file: this._buildFile(base64, fileName)
        }
      }

      objToPass.compressed.size =
        Math.round(objToPass.compressed.file.size / 1000) + ' kB'
      objToPass.compressed.type = 'image/jpeg'

      this.props.onDone(objToPass)
    })
  }

  _redraw = () =>
    this.state.result.base64 && this._drawImage(this.state.result.base64, true)

  _fileOnLoad = () => {
    const { file, reader } = this.state
    const { name, type, size } = file

    const result = {
      name: name,
      type: type,
      size: Math.round(size / 1000) + ' kb',
      base64: reader.result,
      file
    }

    const img = new Image()
    img.src = reader.result

    this.setState({ result }, () => (img.onload = () => this._drawImage(img)))
  }

  _toBlob = imgUrl =>
    window.URL.createObjectURL(base64toblob(imgUrl.split(',')[1], 'image/jpeg'))

  _buildFile = (blob, name) => new File([blob], name)

  componentWillReceiveProps(nextProps) {
    ;(this.props.quality !== nextProps.quality ||
      this.props.scale !== nextProps.scale) &&
      this._redraw()
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          style={{
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: '-1'
          }}
          onChange={this._handleChange}
        />
        <label htmlFor="file" className="ui green icon right labeled button">
          <i aria-hidden="true" className="up arrow icon" />
          {this.props.upload}
        </label>
      </div>
    )
  }
}

class Home extends React.Component {
  state = { visible: false }

  static propTypes = {
    handleNameChange: func,
    name: string
  }

  componentDidMount() {
    this.setState({ visible: true }, () => this.props.handleNameChange(''))
  }

  handleChange = (e, { value }) => this.props.handleNameChange(value)

  handleLanguage = (e, { id }) => this.props.handleLanguage(id)

  render() {
    const { title, placeholder, start, lang } = this.props.language
    return (
      <Transition
        visible={this.state.visible}
        duration={1000}
        animation="fade up"
      >
        <Container style={{ width: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            {title}
          </Header>
          <Form size="large">
            <Button.Group>
              <Button
                id="english"
                color={lang === 'english' ? 'teal' : undefined}
                onClick={this.handleLanguage}
              >
                English
              </Button>
              <Button.Or />
              <Button
                id="malay"
                color={lang === 'malay' ? 'teal' : undefined}
                onClick={this.handleLanguage}
              >
                Melayu
              </Button>
              <Button.Or />
              <Button
                id="chinese"
                color={lang === 'chinese' ? 'teal' : undefined}
                onClick={this.handleLanguage}
              >
                华语
              </Button>
            </Button.Group>
            <Segment stacked>
              <Form.Input
                value={this.props.name}
                onChange={this.handleChange}
                fluid
                transparent
                size="huge"
                placeholder={placeholder}
              />
              <Button
                as={Link}
                to="/find-the-pair/menu"
                color="teal"
                fluid
                size="large"
                disabled={!this.props.name.length}
              >
                {start}
              </Button>
            </Segment>
          </Form>
        </Container>
      </Transition>
    )
  }
}

class Game extends React.Component {
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
    photos: {
      back: photosBack,
      front: this.props.photos.map((photo, i) => ({ type: i, src: photo }))
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
            : this.props.mode === 'mahjong'
              ? this.state.mahjong.front
              : this.state.photos.front,
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
          `https://script.google.com/macros/s/AKfycbyn6Vx1UXmWjLvDMuXY0DMpo9KVqYQx5cNF7kMqq2XfxnpCf9A/exec?name=${name}&steps=${steps}&mode=${mode}&difficulty=${difficulty}&memorize=${
            time.memory
          }&game=${time.game}&date=${date}&time=${hour}`
        )
      ).then(res => res.json())
    }
  }

  format = time => {
    const hour = time / 3600
    const min = (time % 3600) / 60
    const sec = time % 60
    return `${hour > 9 ? hour.toFixed(0) : `0${hour.toFixed(0)}`}:${
      min > 9 ? min.toFixed(0) : `0${min.toFixed(0)}`
    }:${sec > 9 ? sec : `0${sec}`}`
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
      score,
      photos
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
                        this.props.mode === 'poker'
                          ? poker.back
                          : this.props.mode === 'mahjong'
                            ? mahjong.back
                            : photos.back
                      }
                      size="small"
                      onClick={second ? undefined : () => this.select(card.id)}
                      fluid
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

ReactDOM.render(<App />, document.getElementById('root'))
