const router = require('express').Router()
const {Place} = require('../db/models')
const maps = require('@google/maps')
module.exports = router

const googleMapsClient = maps.createClient({
  key: process.env.MAP_API_KEY,
  Promise: Promise
})

// table for converting Interests to Google Places Types
var interestsMap = {
  museums: ['museum'],
  arts: ['art_gallery'],
  nightlife: ['casino', 'bar', 'nightclub'],
  shopping: ['shopping_mall', 'department_store'],
  family: ['aquarium', 'zoo', 'amusement_park', 'park'],
  fineDining: ['restaurant', 'cafe'],
  touristAttractions: ['tourist_attraction']
}

// route handling homepage form
router.post('/', async (req, res, next) => {
  req.body.interests.push('touristAttractions')
  var suggestedLocations = {}
  var coords = req.body.coordinates
  // geocoding the text string provided by the user to Lat/Long coordinates
  // looping over each interest checked by the user
  for (var interest of req.body.interests) {
    //initializing an object with the interest as key on the suggestedLocations object (this will contain arrays corresponding to each type searched under that interest)
    suggestedLocations[interest] = {}
    // looping over each type corresponding to each interest
    for (var type of interestsMap[interest]) {
      //setting type as a key on the interest object with an empty array as its value (this will contain all the places returned from searching for that type)
      suggestedLocations[interest][type] = []
      // making a nearby search API request for each type

      //DON'T NEED AWAIT KEYWORD?
      //can't use await and .then together
      const data = await googleMapsClient
        .placesNearby({
          location: coords,
          type: type,
          rankby: 'prominence',
          radius: 1000
        })
        .asPromise()
        .then(response => {
          // adding locations from response to the suggestedLocations array to be sent to the client
          suggestedLocations[interest][type] = response.json.results
        })
        .catch(error => {
          next(error)
        })
    }
  }
  // sending back a response to the client with the suggestedLocations object
  res.json(suggestedLocations)
})

router.post('/photo', async (req, res, next) => {
  const photoreference = req.body.photoreference
  var photo
  await googleMapsClient
    .placesPhoto({
      photoreference: photoreference,
      maxheight: 200
    })
    .asPromise()
    .then(response => {
      photo = response
    })
    .catch(error => {
      next(error)
    })
  res.send(photo.req.socket._host + photo.req.path)
})

router.get('/:placeId', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        id: req.params.placeId
      },
      order: [['rating', 'DESC']]
    })
    console.log(places, 'GET REQUEST')
    res.json(places)
  } catch (err) {
    next(err)
  }
})
