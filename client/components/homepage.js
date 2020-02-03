import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPlaces} from '../store/places'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
      interests: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getPlaces(this.state.location)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
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

          <label htmlFor="arts">Arts</label>
          <input type="checkbox" name="arts" value="arts" />
          <label htmlFor="shopping">Shopping</label>
          <input type="checkbox" name="shopping" value="shopping" />
          <label htmlFor="nature">Nature</label>
          <input type="checkbox" name="nature" value="nature" />
          <label htmlFor="culture">Culture</label>
          <input type="checkbox" name="culture" value="culture" />
        </form>
      </div>
    )
  }
}

// const mapStateToProps = function() {

// }

const mapDispatchToProps = function(dispatch) {
  return {
    getPlaces: function(places) {
      const action = getPlaces(places)
      dispatch(action)
    }
  }
}

const HomeContainer = connect(null, mapDispatchToProps)(Home)

export default HomeContainer
