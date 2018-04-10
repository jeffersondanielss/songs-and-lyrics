import React, { Component } from 'react'
import { Link } from 'react-router'

class AuthForm extends Component {

  constructor(props) {
    super(props)

    this.state = { email: '', password: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  render() {
    const label = this.props.path === "signup" ? "login" : "signup";
    
    return (
      <div className="row">
        <form className="" onSubmit={ this.onSubmit.bind(this) }>

          <div className="input-field">
            <input
              placeholder="Email"
              onChange={ event => this.setState({ email: event.target.value }) }
              value={ this.state.email }
              required
            />
          </div>

          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              onChange={ event => this.setState({ password: event.target.value }) }
              value={ this.state.password }
              required
            />
          </div>
          
          <div className="errors">
            { this.props.errors.map( error => <div key={error}>{ error }</div> ) }
          </div>

          <Link to={ label }>{ label }</Link>
          <button className="btn right">submit</button>
        </form>
      </div>
    )
  }

}

export default AuthForm;