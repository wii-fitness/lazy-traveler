import React from 'react'
import {connect} from 'react-redux'

class Card extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.place.name}</h4>
        <img src={this.props.place.photoUrl} />
        <h5>need place description!!</h5>
      </div>
    )
  }
}

export default Card
