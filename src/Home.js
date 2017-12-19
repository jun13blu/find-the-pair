import React from 'react'
import {
  Segment,
  Header,
  Button,
  Form,
  Container,
  Transition
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { func, string } from 'prop-types'

export default class Home extends React.Component {
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
