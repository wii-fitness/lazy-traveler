import axios from 'axios'

/**
 * ACTION TYPES
 */
const CREATE_ITINERARY = 'CREATE_ITINERARY'
const CLEAR_ALL = 'CLEAR_ALL'

/**
 * INITIAL STATE
 */
const initialItinerary = {}

/**
 * ACTION CREATORS
 */
const createdItinerary = itinerary => ({type: CREATE_ITINERARY, itinerary})

/**
 * THUNK CREATORS
 */

export const createItinerary = (places, dates) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/itinerary/`, {
        places: places,
        dates: dates
      })
      dispatch(createdItinerary(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialItinerary, action) {
  switch (action.type) {
    case CREATE_ITINERARY:
      return action.itinerary
    case CLEAR_ALL:
      return initialItinerary
    default:
      return state
  }
}
