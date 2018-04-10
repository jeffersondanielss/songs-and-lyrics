import React, { Component } from 'react'
import AuthForm from './AuthForm'
import Signup from '../mutations/Signup'
import currentUser from '../queries/currentUser'
import { graphql } from 'react-apollo'
import { router } from 'react-router'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if ( !this.props.data.user && nextProps.data.user ) {
      hashHistory.push('/')
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]
    })
    .catch( res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div className="container">
        <h3 className="title">Signup</h3>
        
        <AuthForm path={ this.props.route.path } errors={ this.state.errors } onSubmit={ this.onSubmit.bind(this) }/>
      </div>
    )
  }
}

export default graphql(currentUser)(
  graphql(Signup)(SignupForm)
);