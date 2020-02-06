import React from 'react'
import {connect} from 'react-redux'

const Card = props => {
  return (
    <div>
      <h4>{props.place.name}</h4>
      <img src={props.place.photoUrl} />
      <h5>need place description!!</h5>
    </div>
  )
}

export default Card
