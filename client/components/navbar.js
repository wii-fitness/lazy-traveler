import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

import {withStyles, createMuiTheme, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// const newTheme = createMuiTheme({
//   overrides: {
//     MuiToolbar: {
//       regular: {
//         backgroundColor: "#ffff00",
//         color: "#000000",
//         height: "32px",
//         minHeight: "32px",
//         '@media (min-width: 600px)': {
//           minHeight: "48px"
//         }
//       }
//     },
//   }
// })

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
            align="left"
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
              align="left"
              noWrap
              className={classes.toolbarLink}
            >
              <Link to="/home" style={{color: 'white'}}>
                My Itineraries
              </Link>
              <Link to="#" onClick={this.handleClick}>
                <Button variant="contained" size="small">
                  Logout
                </Button>
              </Link>
            </Typography>
          ) : (
            <Link to="/auth/google">
              <Button to="/auth/google" variant="contained" size="small">
                Login
              </Button>
            </Link>
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
  // handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
