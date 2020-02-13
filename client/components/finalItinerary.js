import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'
import Axios from 'axios'
import history from '../history'

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
    this.userSaveItinerary = this.userSaveItinerary.bind(this)
  }

  // saves itinerary by userId
  async userSaveItinerary(event) {
    event.preventDefault()
    try {
      const userId = this.props.user.id

      // this.props.userId
      let result = await Axios.post(`/api/itinerary/${userId}`, {
        places: this.props.itinerary,
        dates: this.props.dates,
        selected: this.props.selected
      })

      if (result) {
        //try props.history.push
        this.props.history.push('/home')
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div className="final-it">
        <div className="itinerary-maps-container">
          <div className="final-itinerary-container">
            <DragDropContext>
              <div className="final-flex">
                <h1 className="it-title">Final Itinerary</h1>
                <button
                  type="button"
                  onClick={this.userSaveItinerary}
                  className="save"
                >
                  Save Itinerary
                </button>
              </div>
              <Container>
                <Droppable droppableId="final-itinerary">
                  {provided => (
                    <LeftList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {Object.keys(this.props.itinerary).map(day => {
                        console.log('DAY', day)
                        return (
                          <div>
                            <h1>Day {parseInt(day) + 1}</h1>
                            {Object.keys(this.props.itinerary[day]).map(
                              time => {
                                console.log('TIME', time)
                                return (
                                  <div>
                                    <h2>{time}</h2>
                                    <ItineraryCard
                                      key={this.props.itinerary[day][time].id}
                                      place={this.props.itinerary[day][time]}
                                    />
                                  </div>
                                )
                              }
                            )}
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
    places: state.places,
    selected: state.selected,
    itinerary: state.itinerary,
    dates: state.dates
  }
}

export default connect(mapStateToProps, null)(FinalItinerary)
