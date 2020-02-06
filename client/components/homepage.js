import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPlaces} from '../store/places'
import LocationSearch from './search'
import {Form} from 'react-bootstrap'
import {daysConverter} from '../utilities/utilities'
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
    console.log(daysConverter(this.state.startDate, this.state.endDate))
    event.preventDefault()
    const start = new Date(this.state.startDate)
    const end = new Date(this.state.endDate)
    var diff = end.getTime() - start.getTime()
    var days = Math.abs(diff / (1000 * 3600 * 24))
    console.log('days', days)

    this.props.getPlaces({
      ...this.state,
      coordinates: [this.props.coordinates.lat, this.props.coordinates.lng]
    })
    // need to check if req was successful
    // this.props.history.push('/builder')
  }

  render() {
    console.log(this.props.coordinates)
    return (
      <div className="homeImage">
        {/* <div className= "home-content-1">
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          </Form>
          </div> */}

        <div className="home-content-1">
          <div className="home-content">
            <div className="home-title">
              <h1 className="title">Let us plan your trip</h1>
              <h3>Create a fully customized itinerary</h3>
            </div>
          </div>

          <div className="planning-form-col">
            <div className="planning-form">
              <form id="planning-form" onSubmit={this.handleSubmit}>
                <div className="steps">
                  <div className="title">Itinerary Planner</div>
                  <div className="destination">
                    <label htmlFor="location">Location:</label>
                    <LocationSearch />
                    {/* <input
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                    /> */}
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
                    Activities preferences
                    <span className="optional"> (optional)</span>
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

                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    coordinates: state.coordinates
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getPlaces: function(formData) {
      const action = getPlaces(formData)
      dispatch(action)
    }
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer
