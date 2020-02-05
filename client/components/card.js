import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Card extends React.Component {
  drag = event => {
    event.dataTransfer.setData('transfer', event.target.id)
  }

  noAllowDrop = event => {
    event.stopPropagation()
  }

  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

// <h4>{this.props.place.name}</h4>
//         <img src={this.props.place.photoUrl} />
//         <h5>need place description!!</h5>

export default Card
