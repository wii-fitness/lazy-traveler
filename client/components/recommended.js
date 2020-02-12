import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Column from './column'
import Column2 from './column2'
import {DragDropContext} from 'react-beautiful-dnd'
import {updatePlaces, refreshAll} from '../store/places'
import {updateSelectPlaces} from '../store/selectplaces'
import {createItinerary} from '../store/itinerary'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      interests: []
    }
    this.buttonRefresh = this.buttonRefresh.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    //this.orderRecommendations = this.orderRecommendations.bind(this)
  }

  onDragEnd = result => {
    const {source, destination} = result

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

  handleSubmit(event) {
    event.preventDefault()
    const itinerary = this.props.createItinerary(
      this.props.selected,
      this.props.dates
    )
    console.log(itinerary)
    this.props.history.push('/itinerary')
  }

  render() {
    return (
      <div className="recommended-view">
        <h1 className="create">Create your itinerary here</h1>
        <div className="column-2">
          <div className="three">
            <div className="one">
              <button onClick={this.buttonRefresh} className="select">
                REFRESH
              </button>
              Recommended Places
            </div>
            <div className="two">
              <Link to="/itinerary" className="generate">
                <button>GENERATE ITINERARY</button>
              </Link>
              Selected Itinerary
            </div>
          </div>
        </div>
        <div id="left-div">
          <div className="columns">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Column columnId="left-column" />
              <Column2 columnId="right-column" />
            </DragDropContext>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    places: state.places,
    selected: state.selected,
    dates: state.dates
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    updatePlaces: places => dispatch(updatePlaces(places)),
    updateSelectPlaces: places => dispatch(updateSelectPlaces(places)),
    refreshAll: places => dispatch(refreshAll(places)),
    createItinerary: (places, dates) => dispatch(createItinerary(places, dates))
  }
}

const RecommendedContainer = connect(mapStateToProps, mapDispatchToProps)(
  Recommended
)
export default RecommendedContainer
