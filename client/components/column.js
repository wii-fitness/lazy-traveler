import React from 'react'
import styled from 'styled-components'
import Card from './card'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: white;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  opacity: 1;
  margin: 8pm;
  border: 3px solid lightgrey;
  border-radius: 2px;
  width: 50%;
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
                return <Card key={place.id} place={place} index={index} />
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
