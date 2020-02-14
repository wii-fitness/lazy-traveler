import React from 'react'
import {connect} from 'react-redux'
import {getCoordinates, clearCoordinates} from '../store/coordinates'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
  }

  // if(this.state.selectedAddress && this.state.address !== this.state.selectedAddress){
  //   this.setState((state) => {
  //     return {
  //       ...state,
  //       selectedAddress: ''
  //     }})
  //   this.props.getCoordinates({})
  // }

  handleChange = address => {
    if (address === '') {
      this.props.clearCoordinates()
    }
    this.setState(state => {
      return {
        ...state,
        address: address
      }
    })
  }

  handleSelect = address => {
    this.setState(() => {
      return {
        address: address
      }
    })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.getCoordinates(latLng))
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
                  ? {
                      backgroundColor: '#88cfe3',
                      opacity: '.75',
                      cursor: 'pointer'
                    }
                  : {backgroundColor: 'white', cursor: 'pointer'}
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
    getCoordinates: coordinates => dispatch(getCoordinates(coordinates)),
    clearCoordinates: () => dispatch(clearCoordinates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch)
