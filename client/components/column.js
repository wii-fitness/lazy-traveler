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

//DROPPABLE has one required parameter, droppableId.  Needs to be unique w/in drag/drop context.
//Error: children is not a function
//Droppable utilizes renderProp patent and expects its child to be a function that returns a react component.
//provided is object that has property, droppableProps.  Props that need to be applied to component that you want to designate as droppable.
//provided object has function, innerRef, used to supply dom node of your component to react dnd.  Styled componet has a callback prop named innerref, which returns dom node of component.
//insert placeholder, which is element used to increase available space during drag when needed.

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

// const mapDispatchToProps = function(dispatch) {

// }

const ColumnContainer = connect(mapStateToProps)(Column)
export default ColumnContainer
