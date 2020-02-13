import Axios from 'axios'

const UPDATE_SELECTED_PLACES = 'UPDATE_SELECTED_PLACES'
const SAVE_ITINERARY = 'SAVE_ITINERARY'

export const updateSelectPlaces = places => ({
  type: UPDATE_SELECTED_PLACES,
  places
})

const saveItinerary = selected => ({
  type: SAVE_ITINERARY,
  places
})

// user is able to save their itinerary
// export const savedUserItinerary = (userId, itineraryId) => {
//   return function() {
//     Axios.post(`/api/${userId}/${itineraryId}`)
//     .then(res => res.data)
//   }
//   .catch(err => console.error(err))
// }

// user is able to save their itinerary
export const saveItineraryThunk = (userId, dates, selected, itinerary) => {
  return async dispatch => {
    try {
      await Axios.post(`/api/itinerary/${userId}`, {
        dates: dates,
        selected: selected,
        itinerary: itinerary
      })
      dispatch(saveItinerary(selected))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_SELECTED_PLACES:
      return action.places
    case SAVE_ITINERARY:
      return action.places
    default:
      return state
  }
}
