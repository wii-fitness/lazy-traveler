import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectPlace} from '../store/selectedPlaces'
import Card from './card'
import styled from 'styled-components'

const Item = styled.div`
  flex-grow: 2;
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`

class Dropzone extends React.Component {
  //RIGHT
  drop = event => {
    event.preventDefault()
    const data = event.dataTransfer.getData('transfer')
    console.log('DATA', data)
    console.log(this.props.places[data])
    // console.log('zebra: ', document.getElementById(data))
    event.target.appendChild(document.getElementById(data))
    console.log('CHILDREN', this.props.children)
    this.props.selectPlace(this.props.places[data])
    console.log('SELECTED', this.props.selected)
  }

  allowDrop = event => {
    event.preventDefault()
  }

  render() {
    console.log('just rendered', this.props.selected)
    return (
      <div
        //id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        style={this.props.style}
      >
        {this.props.selected.map(function(place, index) {
          console.log('just mapped')
          return (
            <Card place={place} key={index}>
              <Item>
                <h4>{place.name}</h4>
                <img src={place.photoUrl} />
                <h5>need place description!!</h5>
              </Item>
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    selected: state.selected
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    selectPlace: place => dispatch(selectPlace(place))
  }
}

Dropzone.propTypes = {
  //id: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)
