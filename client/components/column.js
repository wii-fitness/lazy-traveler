import React from 'react'
import styled from 'styled-components'
import Card from './card'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8pm;
  border: 3px solid lightgrey;
  border-radius: 2px;
  width: 50%;
`
const Title = styled.h3`
  padding: 8px;
`
const LeftList = styled.div`
  padding: 8px;
`

class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>Recommended Places</Title>
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
