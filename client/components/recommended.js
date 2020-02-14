import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Column from './column'
import Column2 from './column2'
import {DragDropContext} from 'react-beautiful-dnd'
import {updatePlaces, refreshAll} from '../store/places'
import {updateSelectPlaces} from '../store/selectplaces'
import {createItinerary} from '../store/itinerary'

import {withStyles, createMuiTheme, makeStyles} from '@material-ui/core/styles'
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1
  },
  toolbarTitle: {
    flex: 1,
    color: 'white'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: 'white'
  }
})

class Recommended extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   interests: []
    // }
    this.buttonRefresh = this.buttonRefresh.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onDragEnd = result => {
    const {source, destination} = result

    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === 'left-side'
    ) {
      const newPlaces = Array.from(this.props.places)
      let placeholder = newPlaces[source.index]
      newPlaces.splice(source.index, 1)
      newPlaces.splice(destination.index, 0, placeholder)
      this.props.updatePlaces(newPlaces)
    } else if (
      source.droppableId === destination.droppableId &&
      source.droppableId === 'right-side'
    ) {
      const newPlaces = Array.from(this.props.selected)
      let placeholder = newPlaces[source.index]
      newPlaces.splice(source.index, 1)
      newPlaces.splice(destination.index, 0, placeholder)
      this.props.updateSelectPlaces(newPlaces)
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
        <h3>Drag and Drop from Our Recommended Places!</h3>
        <div className="column-2">
          <div className="three">
            <div className="one">
              <Link to="#" onClick={this.buttonRefresh}>
                <Button variant="contained" size="small">
                  Refresh
                </Button>
              </Link>

              {/* <button onClick={this.buttonRefresh} className="select">
                REFRESH
              </button>
              Recommended Places */}
            </div>
            <div className="two">
              <button onClick={this.handleSubmit} className="generate">
                GENERATE ITINERARY
              </button>
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
  withStyles(useStyles)(Recommended)
)
export default RecommendedContainer
