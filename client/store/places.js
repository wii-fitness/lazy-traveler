import axios from 'axios'

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
  var orderedArray = []
  // count # of places
  var count = 0
  var cache = {}
  var uniqueCache = {}
  var arraysCombinedLength = 0

  for (var interest of Object.keys(placesObject)) {
    for (var type of Object.keys(placesObject[interest])) {
      //need to create a uniqueCache
      for (var place of placesObject[interest][type]) {
        arraysCombinedLength++
        // if (!localStorage.getItem(place.place_id)) {
        //   if (place.photos) localStorage.setItem(place.place_id, JSON.stringify(place.photos[0].photo_reference))
        // }
        if (!uniqueCache[place.place_id]) {
          count++
          uniqueCache[place.place_id] = place
        }
        if (place.business_status === 'OPERATIONAL') {
          orderedArray.push(place)
        }
      }
    }
  }
  // push one element from each places array into the orderedArray until all the elements are in
  var i = 0
  let length = Object.keys(uniqueCache).length
  while (orderedArray.length < Object.keys(uniqueCache).length) {
    if (i === arraysCombinedLength) {
      break
    }
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
  return orderedArray
}

export const getPlaces = formData => {
  return async dispatch => {
    try {
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
