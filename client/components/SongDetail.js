import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong'

class SongDetail extends Component {

  render() {
    console.log(this.props)

    if( this.props.data.loading ) { return <div>loading...</div> } 

    return (
      <div>
        <h1>Song detail!</h1>
        <h3>{ this.props.data.song.title }</h3>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);