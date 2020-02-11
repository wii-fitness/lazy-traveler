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
// do we need to post in the places table? to do
router.post('/:userId', async (req, res, next) => {
  try {
    const data = req.body.places
    // console.log('req.body.place', data.name)

    // creates new instance in the Itinerary table
    const itinerary = await Itinerary.create({
      city: 'need to update',
      arrival: '2020-02-20',
      departure: '2020-02-20',
      timeOfStay: 2,
      userId: req.params.userId
    })

    // takes array of selected places and updates
    // (i) findsorCreates places in places table
    // (ii) Itinerary Places table with itineraryId and placesId
    data.forEach(async place => {
      // console.log('place.name', place.name)
      await Place.findOrCreate({
        where: {
          id: place.id
        },
        defaults: {
          id: place.id,
          name: place.name,
          city: 'Default',
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          formattedAddress: place.vicinity,
          rating: place.rating,
          priceLevel: place.price_level,
          utc: -300,
          website: 'default.com',
          photoUrl: 'default.url'
        }
      })
      await ItineraryPlace.create({
        itineraryId: itinerary.dataValues.id,
        placeId: place.id
      })
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
