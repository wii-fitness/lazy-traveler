import React from 'react'
import styled from 'styled-components'
import Card from './card'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8pm;
  border: 1px solid lightgrey;
  border-radius: 2px;
`
const Title = styled.h3`
  padding: 8px;
`
const LeftList = styled.div`
  padding: 8px;
`
//DROPPABLE has one required parameter, droppableId.  Needs to be unique w/in drag/drop context.
//Error: children is not a function
//Droppable utilizes renderProp patent and expects its child to be a function that returns a react component.
//provided is object that has property, droppableProps.  Props that need to be applied to component that you want to designate as droppable.
//provided object has function, innerRef, used to supply dom node of your component to react dnd.  Styled componet has a callback prop named innerref, which returns dom node of component.
//insert placeholder, which is element used to increase available space during drag when needed.

export default class Column extends React.Component {
  render() {
    console.log('THIS.PROPS.PLACES:', this.props.places)
    console.log('droppable', Droppable)
    return (
      <Container id="left-side">
        <Title>Column</Title>
        <Droppable droppableId="left-side">
          {provided => (
            <LeftList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.orderRecommendations
                .slice(0, 6)
                .map((place, index) => {
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
