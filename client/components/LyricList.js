import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import likeLyric from '../mutations/likeLyric'

class LyricList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map( ({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          { content }

          <div className="vote-box">
            <i className="material-icons" onClick={ () => this.onLike(id, likes) }>
              thumb_up
            </i>
            <i className="likes">{ likes }</i>
          </div>

        </li>
      )
    })
  }

  render() {
    if ( !this.props.lyrics.length ) return null

    return (
      <ul className="collection">
        { this.renderLyrics() }
      </ul>
    )
  }

}

export default graphql(likeLyric)(LyricList);