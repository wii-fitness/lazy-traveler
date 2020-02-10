const router = require('express').Router()
const {Itinerary, Place, ItineraryPlace, User} = require('../db/models')
const {Op} = require('sequelize')
const maps = require('@google/maps')
module.exports = router

const googleMapsClient = maps.createClient({
  key: process.env.API_KEY,
  Promise: Promise
})

// const times = [
//   0900,
//   0930,
//   1000,
//   1030,
//   1100,
//   1130,
//   1200,
//   1230,
//   1300,
//   1330,
//   1400,
//   1430,
//   1500,
//   1530,
//   1600,
//   1630,
//   1700,
//   1730,
//   1800,
//   1830,
//   1900,
//   1930,
//   2000,
//   2030,
//   2100,
//   2130,
//   2200
// ]

router.get('/', async (req, res, next) => {
  try {
    const itineraries = await Itinerary.findAll()
    res.json(itineraries)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('BODY', req.body)
    const places = req.body.places
    const placeAndTime = {}
    for (var place of places) {
      googleMapsClient
        .place({placeid: place.place_id})
        .asPromise()
        .then(response => {
          console.log('the response', response)
          console.log('The data', response.json)
          placeAndTime[place.place_id] =
            response.json.result.opening_hours.periods
          console.log(response.json.result.opening_hours.periods)
        })
        .catch(err => {
          console.log(err)
        })
    }
    console.log(placeAndTime)
    res.json(places)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(itinerary)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:itineraryId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findAll({
      where: {
        id: req.params.itineraryId
      },
      include: [
        {
          model: User,
          where: {
            id: req.params.userId
          }
        },
        {model: Place}
      ]
    })
    res.json(itinerary)
  } catch (err) {
    next(err)
  }
})
