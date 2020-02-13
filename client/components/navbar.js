import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

// import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';

// const useStyles = makeStyles(theme => ({
//   toolbar: {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
//   toolbarTitle: {
//     flex: 1,
//   },
//   toolbarSecondary: {
//     justifyContent: 'space-between',
//     overflowX: 'auto',
//   },
//   toolbarLink: {
//     padding: theme.spacing(1),
//     flexShrink: 0,
//   },
// }));

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.logout()
  }

  render() {
    // const classes = useStyles()

    return (
      //   <React.Fragment>
      //   <Toolbar className={classes.toolbar}>
      //     <Button size="small">Subscribe</Button>
      //     <Typography
      //       component="h2"
      //       variant="h5"
      //       color="inherit"
      //       align="center"
      //       noWrap
      //       className={classes.toolbarTitle}
      //     >
      //       theLazyTraveler
      //     </Typography>
      //     <Button variant="outlined" size="small">
      //       Login
      //     </Button>
      //   </Toolbar>
      // </React.Fragment>
      // <div>

      //original
      <nav className="navbar">
        <Link to="/" style={{color: 'white'}}>
          <div className="nav-title">theLazyTraveler</div>
        </Link>
        {this.props.isLoggedIn ? (
          <div className="nav-button-after-login">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">My Itineraries</Link>
            <a href="#" onClick={this.handleClick} className="logout">
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <a href="/auth/google" className="login-nav">
              Login with Google
            </a>
          </div>
        )}
      </nav>
      /* <hr /> */
      // </div>
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

// const styledNavBar = makeStyles(useStyles)(Navbar)
export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
