import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPlaces} from '../store/places'
import Search from './search'
import {Form} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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
        {/* <Search /> */}
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

                    <input
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                    />
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
                      <input type="checkbox" name="arts" value="arts" />
                      <label htmlFor="arts">Arts</label>
                    </div>

                    <div className="interest-column">
                      <input type="checkbox" name="shopping" value="shopping" />
                      <label htmlFor="shopping">Shopping</label>
                    </div>

                    <div className="interest-column">
                      <input type="checkbox" name="nature" value="nature" />
                      <label htmlFor="nature">Nature</label>
                    </div>

                    <div className="interest-column">
                      <input type="checkbox" name="culture" value="culture" />
                      <label htmlFor="culture">Culture</label>
                    </div>
                  </div>

                  <button type="submit" onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
