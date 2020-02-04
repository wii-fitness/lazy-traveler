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

export const getPlaces = location => {
  return async dispatch => {
    try {
      console.log('In Thunk', location)
      const {data} = await axios.post(`/api/places/`, {location: location})
      dispatch(gotPlaces(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export function placesReducer(state = initialPlaces, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    default:
      return state
  }
}
