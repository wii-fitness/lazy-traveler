import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
  background: radial-gradient(rgb(235, 235, 235), white);
  display: flex;
  flex-direction: column;
  border: 3px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`
const Title = styled.h2`
  position: relative;
  line-height: 0;
`
const Description = styled.h5`
  position: relative;
  font-weight: 500;
  line-height: 0;
`

class ItineraryCard extends React.Component {
  constructor() {
    super()
    this.state = {
      photo: ''
    }
    this.getPhoto = this.getPhoto.bind(this)
  }

  async componentDidMount() {
    this.setState({photo: await this.getPhoto()})
  }

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
      <Container>
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
    )
  }
}

export default ItineraryCard
