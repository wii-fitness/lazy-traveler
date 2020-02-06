import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Card extends React.Component {
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
    console.log('photo', this.props.place.photos)
    if (this.props.place.photos) {
      const {data} = await axios.post('/api/places/photo', {
        photoreference: this.props.place.photos[0].photo_reference
      })
      return data
    }
  }

  render() {
    console.log('THIS.STATE.PHOTO', this.state.photo)
    return (
      <div>
        <h4>{this.props.place.name}</h4>
        <img src={'https://' + this.state.photo} />
        <h5>need place description!!</h5>
      </div>
    )
  }
}

export default Card
