import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'
import Axios from 'axios'
import history from '../history'
import {saveItineraryThunk} from '../store/selectplaces'

const Container = styled.div`
  background-color: white;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.8;
  margin: 8pm;
  border: 3px solid lightgrey;
  border-radius: 2px;
  width: 50%;
  position: absolute;
  left: 2%;
`

const LeftList = styled.div`
  padding: 8px;
`

class FinalItinerary extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.saveItinerary = this.saveItinerary.bind(this)
    this.sortItinerary = this.sortItinerary.bind(this)
  }

  // // saves itinerary by userId
  // async userSaveItinerary(event) {
  //   event.preventDefault()
  //   try {
  //     const userId = this.props.user.id

  //     // this.props.userId
  //     let result = await Axios.post(`/api/itinerary/${userId}`, {
  //       places: this.props.itinerary,
  //       dates: this.props.dates,
  //       selected: this.props.selected
  //     })

  //     if (result) {
  //       //try props.history.push
  //       this.props.history.push('/home')
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

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
    console.log('this.props', this.props)
    const sortedItinerary = this.sortItinerary(this.props.itinerary)
    return (
      <div className="final-it">
        <div className="itinerary-maps-container">
          <div className="final-itinerary-container">
            <DragDropContext>
              <div className="final-flex">
                <h1 className="it-title">Final Itinerary</h1>
                {this.props.isLoggedIn ? (
                  <button
                    type="button"
                    onClick={this.saveItinerary}
                    className="save"
                  >
                    Save Itinerary
                  </button>
                ) : (
                  <h4>Login to save your itinerary!</h4>
                )}
              </div>
              <Container>
                <Droppable droppableId="final-itinerary">
                  {provided => (
                    <LeftList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {Object.keys(sortedItinerary).map(day => {
                        console.log('DAY', day)
                        return (
                          <div>
                            <h1>Day {parseInt(day) + 1}</h1>
                            {Object.keys(sortedItinerary[day]).map(time => {
                              console.log('TIME', time)
                              return (
                                <div>
                                  <h2>{time}</h2>
                                  <ItineraryCard
                                    key={this.props.itinerary[day][time].id}
                                    place={this.props.itinerary[day][time]}
                                    draggable="false"
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                      {provided.placeholder}
                    </LeftList>
                  )}
                </Droppable>
              </Container>
            </DragDropContext>
          </div>
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
    saveItinerary: async (userId, dates, selected, itinerary) =>
      await dispatch(saveItineraryThunk(userId, dates, selected, itinerary))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalItinerary)
