import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Recommended extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let six = this.props.places.slice(0, 7)
  }

  populate() {
    //   if()
    //   let six = this.props.places.slice(0,7)
    //   return
  }

  render() {
    // when someone drags chosen to the right, need to autopopulate a new place

    return (
      <div>
        <div id="right-side">
          <button onClick={this.buttonRefresh}>Refresh</button>
          <div>
            {this.props.places.map(place => {
              return (
                <div>
                  <h4>{place.name}</h4>
                  <img src={place.photoUrl} />
                  <h5>need place description!!</h5>
                </div>
              )
            })}
          </div>
        </div>
        <div id="left-side">
          <div>dragdrop itinerary</div>
          <button>Generate an Itinerary</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    places: state.places,
    interests: state.interests,
    selected: state.selected
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

const RecommendedContainer = connect(mapStateToProps, mapDispatchToProps)
