import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'
import places from '../dummyData/dummy' //DUMMY DATA MUST DELETE AND REPLACE!

const Container = styled.div`
  margin: 8pm;
  border: 3px solid lightgrey;
  border-radius: 2px;
  width: 50%;
  position: absolute;
  left: 2%;
`
// bottom: 67%; not sure why this was there

const Title = styled.h3`
  padding: 8px;
`
const LeftList = styled.div`
  padding: 8px;
`

class FinalItinerary extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="itinerary-maps-container">
        <div className="final-itinerary-container">
          <DragDropContext>
            <Container>
              <Title>Final Itinerary</Title>
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
                          {Object.keys(this.props.itinerary[day]).map(time => {
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
        <div className="map">{/* <SimpleMap /> */}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places,
    itinerary: state.itinerary
  }
}

// const mapDispatchToProps = dispatch => {
//   return {}
// }

export default connect(mapStateToProps)(FinalItinerary)

// {places.map(place => {//DUMMY DATA
//   return <ItineraryCard key={place.id} place={place} />
// })}
