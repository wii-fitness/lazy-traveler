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
                    {Object.keys(this.props.itinerary).map(
                      (placekey, index) => {
                        return (
                          <div>
                            <h1>{placekey}</h1>
                            <ItineraryCard
                              key={this.props.itinerary[placekey].id}
                              place={this.props.itinerary[placekey]}
                              index={index}
                              draggable="false"
                            />
                          </div>
                        )
                      }
                    )}
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
