import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DATES = 'GET_DATES'

/**
 * INITIAL STATE
 */
const initialDates = {}

/**
 * ACTION CREATORS
 */
export const getDates = dates => ({
  type: GET_DATES,
  dates
})

/**
 * REDUCER
 */
export default function(state = initialDates, action) {
  switch (action.type) {
    case GET_DATES:
      return action.dates
    default:
      return state
  }
}
