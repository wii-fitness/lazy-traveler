import React from 'react'
import styled, {withTheme} from 'styled-components'
import Card from './card'
import Droppable from './Droppable'

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`

const droppableStyle = {
  backgroundColor: '#555',
  width: '250px',
  height: '400px',
  margin: '32px'
}

export default class DndTest extends React.Component {
  render() {
    return (
      <Wrapper>
        <Droppable id="dr1" style={droppableStyle}>
          <Card id="item1" style={{margin: '8px'}}>
            <Item>Some Text</Item>
          </Card>
          <Card id="item2">
            <Item>Some Other Text</Item>
          </Card>
        </Droppable>
        <Droppable id="dr2" style={droppableStyle} />
      </Wrapper>
    )
  }
}

// <Draggable id='item1'>
//                     <Item>Some Text</Item>
//                 </Draggable>
//                 <Draggable id='item2'>
//                     <Item>Some Other Text</Item>
//                 </Draggable>
