import React from 'react'
import styled from 'styled-components'
import Card from './card'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8pm;
  justify-content: center;
  width: 45%;
  min-height: 400px;
`
const Title = styled.h3`
  padding: 8px;
`
const RightList = styled.div`
  padding: 8px;
  min-height: 775px;
  background-color: skyblue;
  flex-grow: 1;
`
//DROPPABLE has one required parameter, droppableId.  Needs to be unique w/in drag/drop context.
//Error: children is not a function
//Droppable utilizes renderProp patent and expects its child to be a function that returns a react component.
//provided is object that has property, droppableProps.  Props that need to be applied to component that you want to designate as droppable.
//provided object has function, innerRef, used to supply dom node of your component to react dnd.  Styled componet has a callback prop named innerref, which returns dom node of component.
//insert placeholder, which is element used to increase available space during drag when needed.

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

// const mapDispatchToProps = function(dispatch) {

// }

const Column2Container = connect(mapStateToProps)(Column2)
export default Column2Container
