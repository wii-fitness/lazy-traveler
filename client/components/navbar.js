import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1
  },
  toolbarTitle: {
    flex: 1,
    color: 'white'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: 'white'
  }
})

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.logout()
  }

  render() {
    const classes = this.props
    return (
      <div className="nav">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link to="/" style={{color: 'white'}}>
              theLazyTraveler
            </Link>
          </Typography>
          {this.props.isLoggedIn ? (
            <Typography
              component="h2"
              variant="subtitle1"
              color="inherit"
              noWrap
              className={classes.toolbarLink}
            >
              <div style={{position: 'absolute', left: '90%', top: '30%'}}>
                <Link
                  to="/home"
                  style={{
                    color: 'white',
                    position: 'absolute',
                    right: '170%',
                    top: '5%'
                  }}
                >
                  My Itineraries
                </Link>
                <Link to="#" onClick={this.handleClick}>
                  <Button variant="contained" size="small">
                    Logout
                  </Button>
                </Link>
              </div>
            </Typography>
          ) : (
            <a
              href="/auth/google"
              className="login-nav"
              style={{
                color: 'white',
                position: 'absolute',
                right: '4.5%',
                top: '30%'
              }}
            >
              Login with Google
            </a>
          )}
        </Toolbar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
