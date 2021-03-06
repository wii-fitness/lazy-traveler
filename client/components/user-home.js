import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPastItineraries} from '../store/itineraryhistory'
import PastItinerary from './pastItinerary'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getPastItineraries(this.props.user.id)
  }

  render() {
    return (
      <div className="userHomeImage">
        <div className="user-home-container">
          <h2 className="saved-h2">Welcome, {this.props.user.email}</h2>
          <h3 className="saved-h3">Saved Itineraries:</h3>
          {this.props.itineraryHistory.map(itinerary => {
            return <PastItinerary itinerary={itinerary} key={itinerary.id} />
          })}
        </div>
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
