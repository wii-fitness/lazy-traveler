import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      interests: []
    }
  }

  populate() {
    //   if()
    //   let six = this.props.places.slice(0,7)
    //   return
  }

  render() {
    // when someone drags chosen to the right, need to autopopulate a new place
    console.log('THIS.PROPS:', this.props)
    return (
      <div>
        <h1>HELLO</h1>
        <div id="right-side">
          <button onClick={this.buttonRefresh}>Refresh</button>
          <div>
            {this.props.places.slice(0, 6).map(place => {
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
    selected: state.selected
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

const RecommendedContainer = connect(mapStateToProps)(Recommended)
export default RecommendedContainer
