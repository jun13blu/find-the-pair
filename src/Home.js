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

export default class Menu extends React.Component {
  state = { visible: false }

  static propTypes = {
    handleNameChange: func,
    name: string
  }

  componentDidMount() {
    this.setState({ visible: true }, () => this.props.handleNameChange(''))
  }

  handleChange = (e, { value }) => this.props.handleNameChange(value)

  render() {
    return (
      <Transition
        visible={this.state.visible}
        duration={1000}
        animation="fade up"
      >
        <Container style={{ width: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Find the Pair
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                value={this.props.name}
                onChange={this.handleChange}
                fluid
                transparent
                size="huge"
                placeholder="Enter your name"
              />
              <Button
                as={Link}
                to="/find-the-pair/menu"
                color="teal"
                fluid
                size="large"
                disabled={!this.props.name.length}
              >
                Start
              </Button>
            </Segment>
          </Form>
        </Container>
      </Transition>
    )
  }
}
