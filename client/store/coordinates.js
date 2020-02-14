/**
 * ACTION TYPES
 */
const GET_COORDINATES = 'GET_COORDINATES'
const CLEAR_COORDINATES = 'CLEAR_COORDINATES'

/**
 * INITIAL STATE
 */
const initialCoordinates = {}

/**
 * ACTION CREATORS
 */
export const getCoordinates = coordinates => ({
  type: GET_COORDINATES,
  coordinates
})

export const clearCoordinates = () => ({
  type: CLEAR_COORDINATES
})

/**
 * REDUCER
 */
export default function(state = initialCoordinates, action) {
  switch (action.type) {
    case GET_COORDINATES:
      return action.coordinates
    case CLEAR_COORDINATES:
      return initialCoordinates
    default:
      return state
  }
}
