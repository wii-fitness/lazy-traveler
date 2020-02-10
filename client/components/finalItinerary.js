import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import ItineraryCard from './itineraryCard'
import SimpleMap from './map'

const Container = styled.div`
  margin: 8pm;
  border: 3px solid lightgrey;
  border-radius: 2px;
  width: 50%;
  position: absolute;
  left: 2%;
`

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
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(FinalItinerary)
