const router = require('express').Router()
const {Place} = require('../db/models')
const {Op} = require('sequelize')
const maps = require('@google/maps')
module.exports = router

const googleMapsClient = maps.createClient({
  key: process.env.API_KEY,
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
  var suggestedLocations = {}
  console.log(req.body.location)
  var coords = []

  // geocoding the text string provided by the user to Lat/Long coordinates
  await googleMapsClient
    .geocode({address: req.body.location})
    .asPromise()
    .then(response => {
      console.log('GEOCODE', response.json.results)
      console.log('GEOMETRY', response.json.results[0].geometry)
      coords[0] = response.json.results[0].geometry.location.lat
      coords[1] = response.json.results[0].geometry.location.lng
    })
    .catch(err => {
      console.log(err)
    })

  console.log('COORDS', coords)

  // looping over each interest checked by the user
  for (var interest of req.body.interests) {
    //initializing an object with the interest as key on the suggestedLocations object (this will contain arrays corresponding to each type searched under that interest)
    suggestedLocations[interest] = {}
    // looping over each type corresponding to each interest
    for (var type of interestsMap[interest]) {
      //setting type as a key on the interest object with an empty array as its value (this will contain all the places returned from searching for that type)
      suggestedLocations[interest][type] = []
      // making a nearby search API request for each type
      await googleMapsClient
        .placesNearby({
          location: coords,
          type: type,
          rankby: 'prominence',
          radius: 25000
        })
        .asPromise()
        .then(response => {
          console.log(response.json.results)
          // adding locations from response to the suggestedLocations array to be sent to the client
          suggestedLocations[interest][type] = response.json.results
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  console.log('Length', suggestedLocations.length)
  // sending back a response to the client with the suggestedLocations object
  res.json(suggestedLocations)
})

router.post('/photo', async (req, res, next) => {
  const photoreference = req.body.photoreference
  var photo
  await googleMapsClient
    .placesPhoto({
      photoreference: photoreference,
      maxwidth: 200
    })
    .asPromise()
    .then(response => {
      console.log('PHOTOBJ', response)
      console.log('PHOTO', response.req.socket._host + response.req.path)
      photo = response
    })
    .catch(err => {
      console.log(err)
    })
  res.send(photo.req.socket._host + photo.req.path)
})

// router.get('/', async (req, res, next) => {
//   try {
//     const places = await Place.findAll({
//       order: [['rating', 'DESC']]
//     })
//     res.json(places)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:placeId', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        id: req.params.placeId
      },
      order: [['rating', 'DESC']]
    })
    // console.log(req.params.location)
    res.json(places)
  } catch (err) {
    next(err)
  }
})

// router.get(
//   '/:location',
//   async (req, res, next) => {
//     try {
//       const location = req.params.location
//       const interest = req.params.interest
//       const interest2 = req.params.interest2
//       const interest3 = req.params.interest3

//       const places = await Place.findAll({
//         where: {
//           city: location,
//           interestType: {
//             [Op.or]: [
//               {[Op.contains]: [interest]},
//               {[Op.contains]: [interest2]},
//               {[Op.contains]: [interest3]}
//             ]
//           }
//         },
//         order: [['rating', 'DESC']]
//       })
//       res.json(places)
//     } catch (err) {
//       next(err)
//     }
//   }
// )
