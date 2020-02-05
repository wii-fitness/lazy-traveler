const SELECT_PLACE = 'SELECT_PLACE'

const initialSelectedPlaces = []

export const selectPlace = place => ({type: SELECT_PLACE, place})

export default function(state = initialSelectedPlaces, action) {
  switch (action.type) {
    case SELECT_PLACE:
      return [...state, action.place]
    default:
      return state
  }
}
