import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
    console.log( this.props )
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
          content
        }
    }
  }
`

export default graphql(mutation)(LyricCreate);