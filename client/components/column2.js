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
const RightList = styled.div`
  padding: 8px;
  min-height: 775px;
  flex-grow: 1;
`

class Column2 extends React.Component {
  render() {
    console.log(this.props.selected)
    return (
      <Container>
        <Title>Selected Itinerary</Title>
        <Droppable droppableId="right-side">
          {provided => (
            <RightList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.selected.map((place, index) => {
                return <Card key={place.id} place={place} index={index} />
              })}
              {provided.placeholder}
            </RightList>
          )}
        </Droppable>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    places: state.places,
    selected: state.selected
  }
}

const Column2Container = connect(mapStateToProps)(Column2)
export default Column2Container
