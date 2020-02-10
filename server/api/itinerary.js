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

router.post('/', async (req, res, next) => {
  try {
    console.log('BODY', req.body)
    const places = req.body.places
    console.log('PLACES', places)
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
