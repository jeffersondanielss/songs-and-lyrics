import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import likeLyric from '../mutations/likeLyric'
import deleteLyric from '../mutations/deleteLyric'
import fetchSong from '../queries/fetchSong'

class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  onLike(id, likes) {
    this.props.likeLyricMutation({
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

  deleteLyric(id) {
    this.props.deleteLyricMutation({
      variables: { id },
      refetchQueries: [{
        query: fetchSong,
        variables: { id: this.props.songId }
      }]
    })
  }

  renderLyrics() {
    return this.props.lyrics.map( ({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          { content }

          <div className="vote-box">
            <i className="material-icons" onClick={ () => this.deleteLyric(id) }>
              delete
            </i>

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

// export default graphql(deleteLyric)(
//   graphql(likeLyric)(LyricList)
// );

export default compose(
  graphql(deleteLyric, { name: 'deleteLyricMutation' }), 
  graphql(likeLyric, { name: 'likeLyricMutation' })
)(LyricList);