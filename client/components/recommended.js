import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Target from './target'
import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

class Recommended extends React.Component {
  constructor() {
    super()
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
      interests: [],
      receivedPlaces: [],
      queuedSix: [],
      chosen: [],
      rejected: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/places')
    this.setState({
      receivedPlaces: data
    })
    // let six = this.state.receivedPlaces.slice(0, 6)
    // this.setState({queuedSix: six})
    // don't know if this is supposed to go in componentDidMount
  }

  refreshCards() {
    // when click refresh, in the 6, if not in state.chosen, then PUSH(?) to state.rejected
    // and then slice again!
    // BUT!!! if they're not chosen, are they necessarily rejected?
    // should they just be recycled?
    // should we have reject(I don't like this) button?
  }

  render() {
    // when someone drags chosen to the right, need to setState on chosen

    return (
      <div>
        <div id="right-side">
          <button onClick={this.refreshCards}>Refresh</button>
          <div>
            {this.state.receivedPlaces.map(place => {
              return (
                <div>
                  <h4>{place.name}</h4>
                  <img src={place.photoUrl} />
                  <h5>need place description!!</h5>
                </div>
              )
            })}
          </div>
        </div>
        <div id="left-side">
          <Target />
          <div>drag&drop itinerary</div>
          <button>Generate an Itinerary</button>
          <DndProvider backend={HTML5Backend}>
            <div>Hello world</div>
          </DndProvider>
        </div>
      </div>
    )
  }
}

export default Recommended
