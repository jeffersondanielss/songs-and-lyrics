import React from 'react'

export default props =>
  <div>
    {
      props.messages.map(
        message => <div className={ props.type } key={message}> { message } </div>
      )
    }
  </div>