import React, { Component } from 'react'
import AuthForm from './AuthForm'
import Login from '../mutations/Login'
import currentUser from '../queries/currentUser'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'
import Title from './title'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if ( !this.props.data.user && nextProps.data.user ) {
      hashHistory.push('/');
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]

    }).catch(res => {
      const errors = res.graphQLErrors.map( ({ message }) => message) 
      this.setState({ errors })

    })
  }

  render() {
    return (
      <div className="container">
        <Title name="Login" />
        
        <AuthForm
          path={ this.props.route.path }
          errors={ this.state.errors }
          onSubmit={ this.onSubmit.bind(this) }
        />
      </div>
    )
  }
}

export default graphql(currentUser)(
  graphql(Login)(LoginForm)
);