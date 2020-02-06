import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from './card'

class FinalItinerary extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.selected.map(place => {
          return <Card key={place.id} place={place} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places,
    selected: state.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps)(FinalItinerary)
