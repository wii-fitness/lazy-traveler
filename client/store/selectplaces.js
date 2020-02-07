const UPDATE_SELECTED_PLACES = 'UPDATE_SELECTED_PLACES'

export const updateSelectPlaces = places => ({
  type: UPDATE_SELECTED_PLACES,
  places
})

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_SELECTED_PLACES:
      return action.places
    default:
      return state
  }
}
