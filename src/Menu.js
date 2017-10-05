import React from 'react'
import { Segment, Header, Button } from 'semantic-ui-react'
import { func } from 'prop-types'

export default class Menu extends React.Component {
  static propTypes = {
    toggle: func
  }

  render() {
    const { toggle } = this.props
    return (
      <Segment basic>
        <Header as="h1" textAlign="center">
          Find the Pair
        </Header>
        <Button basic onClick={toggle}>
          Start the Game
        </Button>
      </Segment>
    )
  }
}
