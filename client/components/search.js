import React from 'react'
import {connect} from 'react-redux'
import {getCoordinates} from '../store/coordinates'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
  }

  handleChange = address => {
    this.setState({address})
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      // sets coordinates for location
      .then(latLng => this.props.getCoordinates(latLng))
  }

  handleSelect = address => {
    this.setState({address})
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'

                const style = suggestion.active
                  ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                  : {backgroundColor: '#ffffff', cursor: 'pointer'}
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

const mapStateToProps = state => {
  return {
    coordinates: state.coordinates
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCoordinates: coordinates => dispatch(getCoordinates(coordinates))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch)
