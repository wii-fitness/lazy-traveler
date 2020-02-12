import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import places from './places'
import coordinates from './coordinates'
import selected from './selectplaces'
import dates from './dates'
import itinerary from './itinerary'
import itineraryHistory from './itineraryhistory'

const reducer = combineReducers({
  user,
  places,
  coordinates,
  selected,
  itineraryHistory,
  itinerary,
  dates
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
