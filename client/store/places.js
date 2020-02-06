import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PLACES = 'GET_PLACES'

/**
 * INITIAL STATE
 */
const initialPlaces = []

/**
 * ACTION CREATORS
 */
const gotPlaces = places => ({type: GET_PLACES, places})

/**
 * THUNK CREATORS
 */

function orderRecommendations(placesObject) {
  // WIP
  console.log('Ordering recommendations')
  var orderedArray = []
  // count # of places
  var count = 0
  for (var interest of Object.keys(placesObject)) {
    for (var type of Object.keys(placesObject[interest])) {
      console.log('interest', interest)
      console.log('type', type)
      console.log('Array', placesObject[interest][type])
      for (var place of placesObject[interest][type]) {
        count++
      }
    }
  }

  // push one element from each places array into the orderedArray until all the elements are in
  var i = 0
  while (orderedArray.length < count) {
    for (var interest2 of Object.keys(placesObject)) {
      for (var type2 of Object.keys(placesObject[interest2])) {
        if (placesObject[interest2][type2][i]) {
          orderedArray.push(placesObject[interest2][type2][i])
        }
      }
    }
    i++
  }
  console.log('Final ordered array:', orderedArray)
  return orderedArray
}

export const getPlaces = formData => {
  return async dispatch => {
    try {
      console.log('In Thunk', formData)
      const {data} = await axios.post(`/api/places/`, {
        // location: formData.location,
        coordinates: formData.coordinates,
        interests: formData.interests
      })
      var orderedData = orderRecommendations(data)
      dispatch(gotPlaces(orderedData))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialPlaces, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    default:
      return state
  }
}
