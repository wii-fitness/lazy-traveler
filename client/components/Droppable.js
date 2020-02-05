import React from 'react'
import PropTypes from 'prop-types'

class Droppable extends React.Component {
  //RIGHT
  drop = event => {
    event.preventDefault()
    const data = event.dataTransfer.getData('transfer')
    event.target.appendChild(document.getElementById(data))
  }

  allowDrop = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    )
  }
}

Droppable.propTypes = {
  id: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node
}

export default Droppable
