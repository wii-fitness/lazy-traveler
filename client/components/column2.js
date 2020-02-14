import React from 'react'
import styled from 'styled-components'
import PlaceCard from './placecard'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: none;
  opacity: 0.9;
  margin: 8pm;
  border: 5px dotted black;
  width: 50%;
`

const RightList = styled.div`
  min-height: 775px;
  align-items: center;
  flex-grow: 1;
`

class Column2 extends React.Component {
  render() {
    console.log(this.props.selected)
    return (
      <Container>
        <Droppable droppableId="right-side">
          {provided => (
            <RightList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.selected.map((place, index) => {
                return <PlaceCard key={place.id} place={place} index={index} />
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
