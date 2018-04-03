import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import addLyricToSong from '../mutations/addLyricToSong'

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
      <div className="add-lyric-form">
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

export default graphql(addLyricToSong)(LyricCreate);