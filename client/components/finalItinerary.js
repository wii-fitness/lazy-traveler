import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'
import Axios from 'axios'

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
  async userSaveItinerary() {
    try {
      const userId = this.props.user.id
      // this.props.userId
      await Axios.post(`/api/itinerary/${userId}`, {
        places: this.props.selected
      })
      // NEED TO REDIRECT TO HOME ONCE THEY CLICK
      // this.props.history.push('/home')
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
                      {this.props.selected.map((place, index) => {
                        return (
                          <ItineraryCard
                            key={place.id}
                            place={place}
                            index={index}
                            draggable="false"
                          />
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
    selected: state.selected
  }
}

export default connect(mapStateToProps, null)(FinalItinerary)
