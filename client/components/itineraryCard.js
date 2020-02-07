import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`
const Title = styled.h4`
  position: relative;
  line-height: 1.1;
`
const Description = styled.h5`
  position: relative;
  font-weight: 500;
  line-height: 1.1;
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
            <img src={'https://' + this.state.photo} />
          </div>
          <div className="description-container">
            <Title>{this.props.place.name}</Title>
            {/* <Description>{this.props.place.rating}</Description> */}
            <Description>need place description!!</Description>
          </div>
        </div>
      </Container>
    )
  }
}

export default ItineraryCard
