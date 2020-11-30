import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'
import {saveItineraryThunk} from '../store/selectplaces'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Container = styled.div`
  background-color: none;
  opacity: 0.9;
  margin: 8pm;
  border: 5px dotted black;
  min-height: 775px;
  width: 50%;
  position: relative;
  left: 2%;
`

const LeftList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`

const useStyles = theme => ({
  toolbarTitle: {
    flex: 1,
    color: 'white',
    textIndent: '15px',
    lineHeight: '3em',
    height: '3em'
  }
})

class FinalItinerary extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.saveItinerary = this.saveItinerary.bind(this)
    this.sortItinerary = this.sortItinerary.bind(this)
  }

  async saveItinerary() {
    await this.props.saveItinerary(
      this.props.user.id,
      this.props.dates,
      this.props.selected,
      this.props.itinerary
    )
    this.props.history.push('./home')
  }

  sortItinerary(itinerary) {
    const sortedItinerary = {}
    Object.keys(itinerary).forEach(function(day) {
      sortedItinerary[day] = {}
      Object.keys(itinerary[day])
        .sort()
        .forEach(function(time) {
          sortedItinerary[day][time] = itinerary[day][time]
        })
    })
    return sortedItinerary
  }

  render() {
    const {classes} = this.props
    const sortedItinerary = this.sortItinerary(this.props.itinerary)
    return (
      <div className="final-it">
        <div className="final-it-header">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="left"
            // textIndent="10px"
            noWrap
            className={classes.toolbarTitle}
          >
            Your Itinerary!
          </Typography>
          {this.props.isLoggedIn ? (
            <Link to="#" onClick={this.saveItinerary}>
              <Button variant="contained" size="small">
                Save Itinerary
              </Button>
            </Link>
          ) : (
            <Typography
              component="h2"
              variant="subtitle2"
              color="inherit"
              align="left"
              noWrap
              className={classes.toolbarTitle}
            >
              Login to save your itinerary!
            </Typography>
          )}
        </div>
        <div className="itineraryPlusMap">
          <Container>
            {Object.keys(sortedItinerary).map(day => {
              return (
                <div>
                  <Typography
                    component="h2"
                    color="inherit"
                    align="left"
                    noWrap
                    className={classes.toolbarTitle}
                  >
                    Day {parseInt(day) + 1}
                  </Typography>
                  {Object.keys(sortedItinerary[day]).map(time => {
                    const formattedTime1 =
                      time.slice(0, 2) + ':' + time.slice(2)
                    const formattedTime =
                      formattedTime1.slice(0, 10) +
                      ':' +
                      formattedTime1.slice(10)
                    return (
                      <ItineraryCard
                        key={this.props.itinerary[day][time].id}
                        timeSlot={formattedTime}
                        place={this.props.itinerary[day][time]}
                        draggable="false"
                      />
                    )
                  })}
                </div>
              )
            })}
          </Container>
          <div className="map">
            <SimpleMap />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selected: state.selected,
    itinerary: state.itinerary,
    dates: state.dates,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    saveItinerary: (userId, dates, selected, itinerary) =>
      dispatch(saveItineraryThunk(userId, dates, selected, itinerary))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(useStyles)(FinalItinerary)
)
