import React from 'react'
import {connect} from 'react-redux'

const Card = props => {
  return (
    <div>
      <h4>{place.name}</h4>
      <img src={place.photoUrl} />
      <h5>need place description!!</h5>
    </div>
  )
}

export default Card
