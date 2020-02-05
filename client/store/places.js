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

export const getPlaces = formData => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/places/`, {
        location: formData.location,
        interests: formData.interests
      })
      dispatch(gotPlaces(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCERS
 */
export default function(state = initialPlaces, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    default:
      return state
  }
}
