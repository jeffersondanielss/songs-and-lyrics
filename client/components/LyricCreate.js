import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import query from '../queries/fetchSongs'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
    .then( () => this.setState({ content: '' }))
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label>Add a lyric</label>
          <input
            type="text"
            value={ this.state.content }
            onChange={ event => this.setState({ content: event.target.value }) }
            required
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
        lyrics {
          id
          content
        }
    }
  }
`

export default graphql(mutation)(LyricCreate);