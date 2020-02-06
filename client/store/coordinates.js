import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COORDINATES = 'GET_COORDINATES'

/**
 * INITIAL STATE
 */
const coordinates = {}

/**
 * ACTION CREATORS
 */
export const getCoordinates = coordinates => ({
  type: GET_COORDINATES,
  coordinates
})

/**
 * REDUCER
 */
export default function(state = coordinates, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return action.coordinates
    default:
      return state
  }
}
