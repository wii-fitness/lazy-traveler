import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import places from './places'
import coordinates from './coordinates'
import selected from './selectplaces'
import itinerary from './itinerary'
import dates from './dates'

const reducer = combineReducers({
  user,
  places,
  coordinates,
  selected,
  itinerary,
  dates
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
