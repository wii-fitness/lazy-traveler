// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {getPastItineraries} from '../store/itineraryhistory'
// import PastItinerary from './pastItinerary'

// /**
//  * COMPONENT
//  */
// class UserHome extends React.Component {
//   componentDidMount() {
//     // console.log('componentdidmount', this.props)
//     this.props.getPastItineraries(this.props.user.id)
//   }

//   render() {
//     return (
//       <div className="user-home-container">
//         <h2>Welcome, {this.props.user.email}</h2>
//         <h3>Saved Itineraries:</h3>
//         {this.props.itineraryHistory.map(itinerary => {
//           return <PastItinerary itinerary={itinerary} key={itinerary.id} />
//         })}
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     user: state.user,
//     itineraryHistory: state.itineraryHistory
//   }
// }

// const mapDispatchToProps = function(dispatch) {
//   return {
//     getPastItineraries: userId => dispatch(getPastItineraries(userId))
//   }
// }

// export default connect(mapState, mapDispatchToProps)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPastItineraries} from '../store/itineraryhistory'
import PastItinerary from './pastItinerary'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    console.log('componentDidMonth', this.props)
    this.props.getPastItineraries(this.props.user.id)
  }

  render() {
    console.log('RENDER', this.props)
    return (
      <div className="user-home-container">
        <h2>Welcome, {this.props.user.email}</h2>
        <h3>Saved Itineraries:</h3>
        {this.props.itineraryHistory.map(itinerary => {
          return <PastItinerary itinerary={itinerary} key={itinerary.id} />
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    itineraryHistory: state.itineraryHistory
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getPastItineraries: userId => dispatch(getPastItineraries(userId))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
