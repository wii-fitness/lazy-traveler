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
      interests: [],
      places: []
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
        console.log('interestsCopy', interestsCopy)
        console.log('eventName', eventName)
        interestsCopy = interestsCopy.concat(eventName)
        console.log('new interestsCopy', interestsCopy)
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
    console.log(this.state.interests)
  }

  handleSubmit() {
    event.preventDefault()
    this.props.getPlaces(this.state.location)
    //this.setState({places: places})
    // make sure that what we get back is an arraY******
    // also, how do we redirect to next view??
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
          <input
            type="checkbox"
            name="arts"
            value="arts"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="shopping">Shopping</label>
          <input
            type="checkbox"
            name="shopping"
            value="shopping"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="nature">Nature</label>
          <input
            type="checkbox"
            name="nature"
            value="nature"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="culture">Culture</label>
          <input
            type="checkbox"
            name="culture"
            value="culture"
            onChange={this.handleCheckbox}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = function() {

// }

const mapDispatchToProps = function(dispatch) {
  return {
    getPlaces: function(location) {
      const action = getPlaces(location)
      dispatch(action)
    }
  }
}

const HomeContainer = connect(null, mapDispatchToProps)(Home)

export default HomeContainer
