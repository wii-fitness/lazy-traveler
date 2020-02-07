import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = () => (
  <img src="https://lakelandescaperoom.com/wp-content/uploads/2019/11/google-map-marker-red-peg-png-image-red-pin-icon-png-clipart-pins-on-a-map-png-880_1360.jpg" />
)

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
    console.log(this.props.coordinates)
    return (
      // Important! Always set the container height explicitly
      <div style={{height: '50vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyDSs_uDWDcTlcv3aHD7hYDyUIUh2FVem8U'}}
          defaultCenter={{
            lat: this.props.coordinates.lat,
            lng: this.props.coordinates.lng
          }}
          defaultZoom={this.props.zoom}
        >
          {this.props.selected.map(place => {
            return (
              <AnyReactComponent
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                text="my marker"
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
