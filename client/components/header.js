import React, { Component } from 'react'
import currentUser from '../queries/currentUser'
import { graphql } from 'react-apollo'
import Logout from '../mutations/Logout'
import { hashHistory } from 'react-router'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    })
  }

  render() {
    return (
      <header className="header">
        { this.props.title }
        <small>Welcome, { this.props.data.user.email }!</small>
        <i
          className="material-icons icon-logout"
          onClick={ this.logout.bind(this) }
          title="logout"
        >
          exit_to_app
        </i>
      </header>
    )
  }
}

export default graphql(Logout)(
  graphql(currentUser)(Header)
)