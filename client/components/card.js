import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: white;
  opacity: 1;
  display: flex;
  flex-direction: column;
  border: 3px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`
const Title = styled.h4`
  position: relative;
  line-height: 1;
`
const Description = styled.h5`
  position: relative;
  font-weight: 500;
  line-height: 1;
`

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      photo: ''
    }
    this.getPhoto = this.getPhoto.bind(this)
  }

  async componentDidMount() {
    const photo = localStorage.getItem(this.props.place.id)
    console.log('PHOTOOOOOOO: ', photo)
    if (photo) {
      this.setState({photo: photo})
    } else {
      this.setState({photo: await this.getPhoto()})
    }
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.place.id, this.state.photo)
    //document bug-fix for rendering images
  }

  //move to thunk
  async getPhoto() {
    if (this.props.place.photos) {
      const {data} = await axios.post('/api/places/photo', {
        photoreference: this.props.place.photos[0].photo_reference
      })
      return data
    }
  }

  render() {
    return (
      <Draggable draggableId={this.props.place.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="container-div">
              <div className="pic-container">
                <img src={'https://' + this.state.photo} className="photo" />
              </div>
              <div className="description-container">
                <Title>{this.props.place.name}</Title>
                <Description>
                  Rating:{' '}
                  {this.props.place.rating ? this.props.place.rating : 'N/A'}
                </Description>
                <Description>Address: {this.props.place.vicinity}</Description>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Card
