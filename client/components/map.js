import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = () => (
  <img
    src="https://vectorified.com/images/map-marker-icon-png-9.jpg"
    style={{height: '25px', width: '25px'}}
  />
)

const apiKey = process.env.API_KEY

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: '',
      lng: ''
    },
    zoom: 12.5
  }

  render() {
    let avgLat =
      this.props.selected.reduce(function(accumulator, place) {
        return place.geometry.location.lat + accumulator
      }, 0) / this.props.selected.length

    let avgLng =
      this.props.selected.reduce(function(accumulator, place) {
        return place.geometry.location.lng + accumulator
      }, 0) / this.props.selected.length

    return (
      // Important! Always set the container height explicitly
      <div style={{height: '75vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: apiKey}}
          defaultCenter={{
            lat: avgLat,
            lng: avgLng
          }}
          defaultZoom={this.props.zoom}
        >
          {this.props.selected.map(place => {
            return (
              <AnyReactComponent
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                // text="my marker"
              />
            )
          })}
        </GoogleMapReact>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selected: state.selected,
    coordinates: state.coordinates
  }
}

export default connect(mapStateToProps, null)(SimpleMap)
