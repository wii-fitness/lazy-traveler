const router = require('express').Router()
const {Itinerary, Place, ItineraryPlace, User} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const itineraries = await Itinerary.findAll()
    res.json(itineraries)
  } catch (err) {
    next(err)
  }
})

//return & await
// router.post('/', async (req, res, next) => {
//   try {
//     const places = req.body.places
//     for (place of places) {
//       Place.findOrCreate(place.id)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

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

// route that saves a user's itinerary
// post (city,location and userId) in itinerary table
// post in itineraryplaces table (itineraryId = itineraryId, placeId = google.id)
// do we need to post in the places table?
router.post('/:userId', async (req, res, next) => {
  try {
    const data = req.body.places
    let googlePlaceId = []

    // need to fix db to use googleId (string vs integer)
    for (let i = 0; i < data.length; i++) {
      googlePlaceId.push(data[i].id)
    }

    // creates new instance in the Itinerary table
    await Itinerary.create({
      city: 'need to update',
      arrival: '2020-02-20',
      departure: '2020-02-20',
      timeOfStay: 2,
      userId: req.params.userId
    }).then(insertedItinerary => {
      ItineraryPlace.bulkCreate([
        {
          itineraryId: insertedItinerary.dataValues.id,
          placeId: 1
        }
      ])
    })
    res.status(201)
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
