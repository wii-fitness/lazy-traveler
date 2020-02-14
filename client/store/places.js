import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PLACES = 'GET_PLACES'
const UPDATE_PLACES = 'UPDATE_PLACES'
const REFRESH_ALL = 'REFRESH_ALL'
const CLEAR_ALL = 'CLEAR_ALL'

/**
 * INITIAL STATE
 */
const initialPlaces = []

/**
 * ACTION CREATORS
 */
const gotPlaces = places => ({type: GET_PLACES, places})
export const updatePlaces = places => ({type: UPDATE_PLACES, places})
export const refreshAll = places => ({type: REFRESH_ALL, places})
export const clearAll = () => ({type: CLEAR_ALL})

/**
 * THUNK CREATORS
 */

function orderRecommendations(placesObject) {
  // console.log('Ordering recommendations')
  var orderedArray = []
  // count # of places
  var count = 0
  var cache = {}
  var uniqueCache = {}

  for (var interest of Object.keys(placesObject)) {
    for (var type of Object.keys(placesObject[interest])) {
      // console.log('interest', interest)
      // console.log('type', type)
      // console.log('Array', placesObject[interest][type])

      //need to create a uniqueCache
      for (var place of placesObject[interest][type]) {
        if (!uniqueCache[place.id]) {
          count++
          uniqueCache[place.id] = place
        }
      }
    }
  }
  // console.log('FINAL COUNT', count)
  // push one element from each places array into the orderedArray until all the elements are in
  var i = 0
  while (orderedArray.length < Object.keys(uniqueCache).length) {
    for (var interest2 of Object.keys(placesObject)) {
      for (var type2 of Object.keys(placesObject[interest2])) {
        if (placesObject[interest2][type2][i]) {
          //checks for duplicates before updating cache
          if (!cache[placesObject[interest2][type2][i].id]) {
            cache[placesObject[interest2][type2][i].id] =
              placesObject[interest2][type2][i]
            //pushes only unique places into array
            orderedArray.push(placesObject[interest2][type2][i])
          }
        }
      }
    }
    i++
  }
  console.log('Final ordered array:', orderedArray)
  console.log('count', count)
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
    case UPDATE_PLACES:
      return action.places
    case REFRESH_ALL:
      return action.places
    case CLEAR_ALL:
      return initialPlaces
    default:
      return state
  }
}
