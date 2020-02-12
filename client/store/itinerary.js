import axios from 'axios'

/**
 * ACTION TYPES
 */
const CREATE_ITINERARY = 'CREATE_ITINERARY'

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
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialItinerary, action) {
  switch (action.type) {
    case CREATE_ITINERARY:
      console.log(
        'Just hit the Create Itinerary reducer which means this is working'
      )
      return action.itinerary
    default:
      return state
  }
}
