import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Column from './column'
import Column2 from './column2'
import {DragDropContext} from 'react-beautiful-dnd'
import {updatePlaces, refreshAll} from '../store/places'
import {updateSelectPlaces} from '../store/selectplaces'
import {createItinerary} from '../store/itinerary'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1,
    display: 'column',
    justifyContent: 'space-evenly'
  },
  toolbarTitle: {
    flex: 1,
    color: 'white',
    textIndent: '15px',
    lineHeight: '3em',
    height: '3em'
  },
  button: {
    height: 30
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
    this.buttonRefresh = this.buttonRefresh.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidCatch() {
    if (!Object.values(this.props.dates).length) {
      this.props.history.push('/')
      location.reload()
    }
  }

  componentDidMount() {
    if (!Object.values(this.props.dates).length) {
      this.props.history.push('/')
      location.reload()
    }
    let start = ''
    let end = ''
    let wrongOrder = false
    for (let i = 0; i < this.props.dates.start.length; i++) {
      if (this.props.dates.start[i] !== '-') start += this.props.dates.start[i]
      if (this.props.dates.end[i] !== '-') end += this.props.dates.end[i]
      if (start.length === 4) {
        if (Number(start) > Number(end)) {
          wrongOrder = true
        } else {
          if (i === 3 && Number(start) < Number(end)) {
            break
          }
          start = ''
          end = ''
        }
      }
    }

    if (wrongOrder) {
      alert('The start date must come before the end date!')
      this.props.history.push('/')
      
    }
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
    if (!this.props.selected.length) {
      alert('Please drag and drop places to create your itinerary!')
    } else {
      this.props.createItinerary(this.props.selected, this.props.dates)
      this.props.history.push('/itinerary')
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className="recommended-view">
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          textIndent="10px"
          noWrap
          className={classes.toolbarTitle}
        >
          <h2 className="drag-drop-title">Drag & Drop</h2>
        </Typography>
        <div className="recommend-subtitle">
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            align="left"
            textIndent="10px"
            noWrap
            className={classes.toolbarTitle}
          >
            <div className="dAndDTitles">Recommendations</div>
          </Typography>
          <Link to="#" onClick={this.buttonRefresh}>
            <Button variant="contained" size="small" className={classes.button}>
              Refresh
            </Button>
          </Link>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            align="left"
            textIndent="10px"
            noWrap
            className={classes.toolbarTitle}
          >
            <div className="dAndDTitles">Selected Places</div>
          </Typography>
          <Link to="#" onClick={this.handleSubmit}>
            <Button variant="contained" size="small" className={classes.button}>
              Generate Itinerary
            </Button>
          </Link>
        </div>

        <div className="columns">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Column columnId="left-column" />
            <Column2 columnId="right-column" />
          </DragDropContext>
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
