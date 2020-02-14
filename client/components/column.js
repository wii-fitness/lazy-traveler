import React from 'react'
import styled from 'styled-components'
import PlaceCard from './placecard'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: none;
  opacity: 0.85;
  margin: 8pm;
  width: 47%;
`

const LeftList = styled.div`
  padding: 8px;
`

class Column extends React.Component {
  render() {
    return (
      <Container>
        <Droppable droppableId="left-side">
          {provided => (
            <LeftList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.places.slice(0, 6).map((place, index) => {
                return <PlaceCard key={place.id} place={place} index={index} />
              })}
              {provided.placeholder}
            </LeftList>
          )}
        </Droppable>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    places: state.places
  }
}

const ColumnContainer = connect(mapStateToProps)(Column)
export default ColumnContainer
