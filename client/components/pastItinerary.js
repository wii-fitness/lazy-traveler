import React from 'react'

export default function PastItinerary(props) {
  return (
    <div className="itinerary-history-details-container">
      <h4>
        {`${props.itinerary.city}
      (${props.itinerary.arrival} to ${props.itinerary.departure})`}
      </h4>
      {props.itinerary.places.map(place => {
        return (
          <div key={place.id} className="itinerary-details">
            <img src={place.photoUrl} />
            <ul style={{width: '35%'}}>{place.name}</ul>
            <ul style={{width: '15%'}}>{`Rating: ${place.rating}`}</ul>
            <ul style={{width: '35%'}}>
              <a href={`${place.website}`}>{place.website}</a>
            </ul>
          </div>
        )
      })}
    </div>
  )
}
