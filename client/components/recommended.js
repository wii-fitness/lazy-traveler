import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'
import styled from 'styled-components'
import Card from './card'
import Droppable from './Droppable'
import Dropzone from './Dropzone'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      interests: []
    }
  }

  populate() {
    //   if()
    //   let six = this.props.places.slice(0,7)
    //   return
  }

  render() {
    // when someone drags chosen to the right, need to autopopulate a new place
    const Wrapper = styled.div`
      width: 100%;
      padding: 32px;
      display: flex;
      justify-content: center;
    `

    const Item = styled.div`
      flex-grow: 2;
      padding: 8px;
      color: #555;
      background-color: white;
      border-radius: 3px;
    `

    const droppableStyle = {
      backgroundColor: '#555',
      width: '300px',
      height: '800px',
      margin: '32px'
    }
    console.log('THIS.PROPS:', this.props)
    return (
      <div>
        <Wrapper>
          <Droppable id="dr1" style={droppableStyle}>
            {this.props.places.slice(0, 6).map((place, index) => {
              return (
                <Card
                  id={index}
                  style={{margin: '8px'}}
                  key={place.id}
                  place={place}
                >
                  <Item>
                    <h4>{place.name}</h4>
                    <img src={place.photoUrl} />
                    <h5>need place description!!</h5>
                  </Item>
                </Card>
              )
            })}
          </Droppable>
          <br />
          <Dropzone
            id="dr2"
            style={droppableStyle}
            places={this.props.places}
          />
        </Wrapper>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    places: state.places,
    selected: state.selected
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

const RecommendedContainer = connect(mapStateToProps)(Recommended)
export default RecommendedContainer
