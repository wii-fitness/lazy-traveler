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
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckbox(event) {
    var eventName = event.target.name
    console.log('Checked?', event.target.checked)
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
        console.log('Within setstate', interestsCopy)
        return {interests: interestsCopy}
      })
    }
  }

  handleSubmit() {
    event.preventDefault()
    this.props.getPlaces(this.state)
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
          <label htmlFor="shopping">Museums</label>
          <input
            type="checkbox"
            name="museums"
            value="museums"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="nature">Shopping</label>
          <input
            type="checkbox"
            name="shopping"
            value="shopping"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="culture">Family</label>
          <input
            type="checkbox"
            name="family"
            value="family"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="arts">Nightlife</label>
          <input
            type="checkbox"
            name="nightlife"
            value="nightlife"
            onChange={this.handleCheckbox}
          />
          <label htmlFor="arts">Fine Dining</label>
          <input
            type="checkbox"
            name="fineDining"
            value="fineDining"
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
    getPlaces: function(formData) {
      const action = getPlaces(formData)
      dispatch(action)
    }
  }
}

const HomeContainer = connect(null, mapDispatchToProps)(Home)

export default HomeContainer
