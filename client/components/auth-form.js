import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="homeImage">
      <div className="home-content-1">
        <div className="home-content">
          <div className="auth-title">
            <h1 className="auth-image-title">Let us plan your trip</h1>
            <h3 className="auth-image-title-2">
              Create a fully customized itinerary
            </h3>
          </div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} name={name}>
          <div className="auth-title-2">{displayName}</div>
          <div className="auto-search-container">
            <div>
              <label htmlFor="email">
                <div>Email:</div>
              </label>
              <input name="email" type="text" className="auth-email" />
            </div>
            <div>
              <label htmlFor="password">
                <div>Password:</div>
              </label>
              <input name="password" type="password" className="auth-email" />
            </div>
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          <a href="/auth/google">{displayName} with Google</a>
        </form>
      </div>
  
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
