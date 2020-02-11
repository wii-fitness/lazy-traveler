import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PAST_ITINERARIES = 'GET_PAST_ITINERARIES'

/**
 * INITIAL STATE
 */
const initialHistory = []

/**
 * ACTION CREATORS
 */
const gotPastItineraries = itineraries => ({
  type: GET_PAST_ITINERARIES,
  itineraries
})

/**
 * THUNK CREATORS
 */

export const getPastItineraries = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/itinerary/${userId}`)
      dispatch(gotPastItineraries(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialHistory, action) {
  switch (action.type) {
    case GET_PAST_ITINERARIES:
      return action.itineraries
    default:
      return state
  }
}
