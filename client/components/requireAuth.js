import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUser from '../queries/currentUser'
import { hashHistory } from 'react-router'


export default (WrappedCompoment) => {

  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user ) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedCompoment {...this.props} />
    }
  }

  return graphql(currentUser)(RequireAuth);

};