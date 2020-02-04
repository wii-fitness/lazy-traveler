const router = require('express').Router()
const {Place} = require('../db/models')
const {Op} = require('sequelize')
const maps = require('@google/maps')
module.exports = router

const googleMapsClient = maps.createClient({
  key: process.env.API_KEY,
  Promise: Promise
})

var interestsMap = {
  museum: ['museum'],
  arts: ['art_gallery'],
  nightlife: ['casino', 'bar', 'nightclub'],
  shopping: ['shopping_mall', 'department_store'],
  family: ['aquarium', 'zoo', 'amusement_park', 'park'],
  fine_dining: ['restaurant', 'cafe'],
  tourist_attractions: ['tourist_attraction']
}

router.post('/', async (req, res, next) => {
  var suggestedLocations = []
  console.log(req.body.location)
  var coords = []
  var geocodeResponse = await googleMapsClient
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
  var interests = ['tourist_attractions']
  for (var interest of interests) {
    for (var type of interestsMap[interest]) {
      googleMapsClient
        .placesNearby({
          location: coords,
          type: type,
          rankby: 'prominence',
          radius: 50000
        })
        .asPromise()
        .then(response => {
          console.log(response.json.results)
          suggestedLocations = suggestedLocations.concat(response.json.results)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  res.json(suggestedLocations)
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
