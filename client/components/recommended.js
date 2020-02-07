import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from './card'
import Column from './column'
import Column2 from './column2'
import {DragDropContext} from 'react-beautiful-dnd'
import {updatePlaces, refreshAll} from '../store/places'
import {updateSelectPlaces} from '../store/selectplaces'
import SimpleMap from './map'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      interests: []
      // columns: {
      //   leftColumn: {
      //     id: 'left-column',
      //     title: 'Recommended For You',
      //     cardIds: this.props.places.map(place => {
      //       return place.id
      //     })
      //   }
      // }
    }
    this.buttonRefresh = this.buttonRefresh.bind(this)
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

  onDragEnd = result => {
    console.log('in ondragEnd:', result)
    let {source, destination} = result

    if (source.droppableId === destination.droppableId) {
      const newPlaces = Array.from(this.props.places)
      let placeholder = newPlaces[source.index]
      newPlaces.splice(source.index, 1)
      newPlaces.splice(destination.index, 0, placeholder)
      this.props.updatePlaces(newPlaces)
    } else if (
      source.droppableId === 'left-side' &&
      destination.droppableId === 'right-side'
    ) {
      // creates a new copy of places generated
      const newPlaces = Array.from(this.props.places)

      // holds the copy of the item for removal
      let placeholder = newPlaces[source.index]

      // creates a new copy of selected places, is empty at first
      const newSelectedPlaces = Array.from(this.props.selected)
      // push the copy of the item into selected places
      newSelectedPlaces.splice(destination.index, 0, placeholder)
      // updates store for selected places
      this.props.updateSelectPlaces(newSelectedPlaces)

      // updates the copy with the removed place
      newPlaces.splice(source.index, 1)
      this.props.updatePlaces(newPlaces)
    } else if (
      destination.droppableId === 'left-side' &&
      source.droppableId === 'right-side'
    ) {
      // creates a new copy of selected places
      const newSelectedPlaces = Array.from(this.props.selected)

      // holds the copy of the item for removal
      let placeholder = newSelectedPlaces[source.index]

      // creates a new copy of places generated
      const newPlaces = Array.from(this.props.places)

      // push the copy of the item into selected places
      newPlaces.splice(destination.index, 0, placeholder)

      // updates the copy with the removed place
      newSelectedPlaces.splice(source.index, 1)
      this.props.updatePlaces(newPlaces)

      // updates store for selected places
      this.props.updateSelectPlaces(newSelectedPlaces)
    }
  }

  buttonRefresh() {
    //need to put counter, when to hit API to refresh places
    let placesCopy = Array.from(this.props.places)
    let placeholder = placesCopy.slice(0, 6)
    placesCopy.splice(0, 6)
    placesCopy = [...placesCopy, ...placeholder]
    this.props.refreshAll(placesCopy)
  }

  render() {
    // const cards = this.state.columns['leftColumn'].cardIds.map((cardId) => {
    //   if (cardId === this.props.places.id) return(

    // ))
    console.log('THIS.PROPS:', this.props)
    return (
      <div>
        <div style={{width: '28%', height: '25%'}}>
          <SimpleMap />
        </div>
        <h1>HELLO</h1>
        <div id="left-div">
          <button onClick={this.buttonRefresh}>Refresh</button>
          <div className="columns">
            <DragDropContext
              // onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
            >
              <Column columnId="left-column" />
              <Column2 columnId="right-column" />
            </DragDropContext>
          </div>
        </div>
        <div id="right-div">
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
  return {
    updatePlaces: places => dispatch(updatePlaces(places)),
    updateSelectPlaces: places => dispatch(updateSelectPlaces(places)),
    refreshAll: places => dispatch(refreshAll(places))
  }
}

const RecommendedContainer = connect(mapStateToProps, mapDispatchToProps)(
  Recommended
)
export default RecommendedContainer
