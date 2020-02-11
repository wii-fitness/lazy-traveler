import React from 'react'

export default function PastItinerary(props) {
  return (
    <div>
      <h2>{`Itinerary for ${props.itinerary.city} for ${
        props.itinerary.arrival
      } to ${props.itinerary.departure}`}</h2>
      {props.itinerary.places.map(place => {
        return (
          <div key={place.id}>
            <img src={place.photoUrl} />
            <ul>{place.name}</ul>
            <ul>{`Rating: ${place.rating}`}</ul>
            <a href={`${place.website}`}>{place.website}</a>
          </div>
        )
      })}
    </div>
  )
}
