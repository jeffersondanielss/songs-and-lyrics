import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs'
import deleteSong from '../mutations/deleteSong'
import Header from './header'

class SongsList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map( ({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`songs/${id}`} className="collection-link">
            { title }
          </Link>
          <i className="material-icons" onClick={ () => this.onSongDelete(id) }>
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if ( this.props.data.loading ) { return <div>loading...</div> }

    return (
      <div>
        <Header title="Songs" />
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(
  graphql(fetchSongs)(SongsList)
);