import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from './card'
import Column from './column'
import {DragDropContext} from 'react-beautiful-dnd'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      interests: []
    }
    //this.orderRecommendations = this.orderRecommendations.bind(this)
  }

  // orderRecommendations() {
  //   // WIP
  //   console.log('Ordering recommendations')
  //   console.log('This.props.places:', this.props.places)
  //   var orderedArray = []
  //   // count # of places
  //   var count = 0
  //   for (var interest of Object.keys(this.props.places)) {
  //     for (var type of Object.keys(this.props.places[interest])) {
  //       console.log('interest', interest)
  //       console.log('type', type)
  //       console.log('Array', this.props.places[interest][type])
  //       for (var place of this.props.places[interest][type]) {
  //         count++
  //       }
  //     }
  //   }
  //   // push one element from each places array into the orderedArray until all the elements are in
  //   var i = 0
  //   while (orderedArray.length < count) {
  //     for (var interest2 of Object.keys(this.props.places)) {
  //       for (var type2 of Object.keys(this.props.places[interest2])) {
  //         if (this.props.places[interest2][type2][i]) {
  //           orderedArray.push(this.props.places[interest2][type2][i])
  //         }
  //       }
  //     }
  //     i++
  //   }
  //   console.log('Final ordered array:', orderedArray)
  //   return orderedArray
  // }

  //only one that is required.
  //responsibility of this function to synchronously update state to reflect drag/drop result.
  onDragEnd = result => {}

  render() {
    // when someone drags chosen to the right, need to autopopulate a new place
    console.log('THIS.PROPS:', this.props)
    return (
      <div>
        <h1>HELLO</h1>
        <div id="right-side">
          <button onClick={this.buttonRefresh}>Refresh</button>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Column />
          </DragDropContext>
        </div>
        <div id="left-side">
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

// {this.orderRecommendations()
//   .slice(0, 7)
//   .map(place => {
//     return <Card key={place.id} place={place} />
//   })}
