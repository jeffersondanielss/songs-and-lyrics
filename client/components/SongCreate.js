import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs'
import addSong from '../mutations/addSong'
import Header from './header'

class SongCreate extends Component {
  
  constructor(props){
    super(props)

    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    })
    .then(() => hashHistory.push('/') )
  }

  render() {
    return (
      <div>
        <Header title="Songs" />
        
        <Link to="/">
          <i className="material-icons">
            arrow_back
          </i>
        </Link>
        
        <h4 className="section-title">Create new song</h4>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label>Song Title:</label>
          <input
            onChange={ event => this.setState({ title: event.target.value }) }
            value={ this.state.title }
          />
        </form>
      </div>
    )
  }

}

export default graphql(addSong)(SongCreate);