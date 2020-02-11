import Axios from 'axios'

const UPDATE_SELECTED_PLACES = 'UPDATE_SELECTED_PLACES'

export const updateSelectPlaces = places => ({
  type: UPDATE_SELECTED_PLACES,
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

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_SELECTED_PLACES:
      return action.places
    default:
      return state
  }
}
