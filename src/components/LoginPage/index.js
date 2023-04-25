import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showFailureMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 90})
    const {history} = this.props
    history.replace('/')
  }

  onFailureSuccess = errorMsg => {
    this.setState({showFailureMsg: true, errorMsg})
  }

  onChangeInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailureSuccess(data.error_msg)
    }
  }

  render() {
    const {username, password, showFailureMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Login-container">
        <img
          src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/Rectangle_1457.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673323199469"
          alt="website-logo"
          className="login-image-mobile"
        />
        <div className="form-container">
          <form className="form-el" onSubmit={this.onSubmitForm}>
            <img
              src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/Group_7420.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673321846120"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-heading">Tasty Kitchens</h1>
            <h1 className="website-sub-heading">Login</h1>

            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              className="input-el"
              onChange={this.onChangeInput}
            />

            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="input-el"
              onChange={this.onChangePassword}
            />
            {showFailureMsg && <p className="login-error-msg">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/Rectangle_1456.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673318039020"
          alt="website login"
          className="login-image"
        />
      </div>
    )
  }
}

export default Login
