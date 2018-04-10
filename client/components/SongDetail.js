import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList'
import Header from './header'

class SongDetail extends Component {

  render() {
    const { song } = this.props.data;

    if( !song ) { return <div>loading...</div> }

    return (
      <div>
        <Header title="Lyrics" />
        
        <Link to="/">
          <i className="material-icons">
            arrow_back
          </i>
        </Link>

        <h3 className="section-title">{ song.title }</h3>
        <LyricList songId={ this.props.params.id } lyrics={ song.lyrics } />
        <LyricCreate songId={ this.props.params.id } />
      </div>
    )
  }

}

export default graphql(fetchSong, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);