import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPlaces} from '../store/places'
import LocationSearch from './search'
import PropTypes from 'prop-types'
import {Form} from 'react-bootstrap'
import {daysConverter} from '../utilities/utilities'
import {getDates} from '../store/dates'
import Navbar from './navbar'
// import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
      days: 0,
      interests: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckbox(event) {
    var eventName = event.target.name
    if (event.target.checked) {
      // using a callback function in this.setState to avoid referencing previous state (caused linter error)
      // first interests is copied to interestsCopy, then the checkbox item in question is added or removed to the copy
      // finally the interests on state is set to the modified copy
      this.setState(prevState => {
        var interestsCopy = [...prevState.interests]
        interestsCopy = interestsCopy.concat(eventName)
        return {interests: interestsCopy}
      })
    } else {
      this.setState(prevState => {
        var interestsCopy = [...prevState.interests]
        interestsCopy = interestsCopy.filter(item => {
          return item !== eventName
        })
        return {interests: interestsCopy}
      })
    }
  }

  handleSubmit() {
    event.preventDefault()
    if (
      Object.keys(this.props.coordinates).length &&
      this.state.startDate &&
      this.state.endDate
    ) {
      this.props.getPlaces({
        ...this.state,
        coordinates: [this.props.coordinates.lat, this.props.coordinates.lng]
      })
      this.props.getDates(this.state.startDate, this.state.endDate)
      // need to check if req was successful
      this.props.history.push('/builder')
    } else {
      alert('Please enter a location, a start date and an end date')
    }
  }

  render() {
    const {email} = this.props
    return (
      <div className="homeImage">
        <h3 className="welcome">{email ? `Welcome, ${email}` : ''}</h3>
        <div className="home-content-1">
          <div className="home-content">
            <div className="home-title">
              <h1 className="image-title">Let us plan your trip</h1>
              <h3>Create a fully customized itinerary</h3>
            </div>
          </div>

          <form id="planning-form" onSubmit={this.handleSubmit}>
            <div className="steps">
              <div className="title">Itinerary Planner</div>
              <div className="destination-search">
                <div className="destination">
                  <label htmlFor="location" />
                  <div className="auto-search-container">
                    <LocationSearch />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="start">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleChange}
                />
                <label htmlFor="end">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="preference-title">
                Activities preferences{'(Optional)'}
                <span className="optional"> </span>
              </div>
              <div className="interests">
                <div className="interest-column">
                  <label htmlFor="arts">Arts</label>
                  <input
                    type="checkbox"
                    name="arts"
                    value="arts"
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="interest-column">
                  <label htmlFor="shopping">Museums</label>
                  <input
                    type="checkbox"
                    name="museums"
                    value="museums"
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="interest-column">
                  <label htmlFor="nature">Shopping</label>
                  <input
                    type="checkbox"
                    name="shopping"
                    value="shopping"
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="interest-column">
                  <label htmlFor="culture">Family</label>
                  <input
                    type="checkbox"
                    name="family"
                    value="family"
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="interest-column">
                  <label htmlFor="arts">Nightlife</label>
                  <input
                    type="checkbox"
                    name="nightlife"
                    value="nightlife"
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="interest-column">
                  <label htmlFor="arts">Fine Dining</label>
                  <input
                    type="checkbox"
                    name="fineDining"
                    value="fineDining"
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    coordinates: state.coordinates,
    email: state.user.email
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getPlaces: function(formData) {
      const action = getPlaces(formData)
      dispatch(action)
    },
    getDates: function(start, end) {
      const dates = {start: start, end: end}
      dispatch(getDates(dates))
    }
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

HomeContainer.propTypes = {
  email: PropTypes.string
}

export default HomeContainer
