const router = require('express').Router()
const {Itinerary, Place, ItineraryPlace, User} = require('../db/models')
const maps = require('@google/maps')

module.exports = router

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

function getDates(startDate, stopDate) {
  var dateArray = new Array()
  var currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate))
    currentDate = currentDate.addDays(1)
  }
  return dateArray
}

const googleMapsClient = maps.createClient({
  key: process.env.MAP_API_KEY,
  Promise: Promise
})

const times = [
  '0900',
  '0930',
  '1000',
  '1030',
  '1100',
  '1130',
  '1200',
  '1230',
  '1300',
  '1330',
  '1400',
  '1430',
  '1500',
  '1530',
  '1600',
  '1630',
  '1700',
  '1730',
  '1800',
  '1830',
  '1900',
  '1930',
  '2000',
  '2030',
  '2100',
  '2130',
  '2200'
]

router.get('/', async (req, res, next) => {
  try {
    const itineraries = await Itinerary.findAll()
    res.json(itineraries)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const places = req.body.places
    const dates = req.body.dates
    const startDate = dates.start
    const endDate = dates.end

    const days = getDates(new Date(startDate), new Date(endDate))
    const numDays = days.length
    //const numDays = Math.floor((new Date(startDate).getTime() - new Date(endDate).getTime()) / (1000 * 3600 * 24))

    const placesWithHours = []
    for (var place of places) {
      await googleMapsClient
        .place({placeid: place.place_id})
        .asPromise()
        .then(response => {
          if (response.json.result.opening_hours) {
            place.hours = response.json.result.opening_hours.periods
          } else {
            place.hours = undefined
          }
          placesWithHours.push(place)
        })
        .catch(error => {
          next(error)
        })
    }

    const itinerary = {}

    const dayTimes = []

    for (day of days) {
      dayTimes.push(Array.from(times))
    }

    while (placesWithHours.length) {
      var place = placesWithHours.pop()
      var dayIdx = 0
      outerloop: while (dayIdx < dayTimes.length) {
        var i = 0
        var time = dayTimes[dayIdx]
        if (!itinerary[dayIdx]) {
          itinerary[dayIdx] = {}
        }
        while (i < time.length) {
          if (time[i] !== 'x') {
            if (place.hours) {
              if (place.hours[0].close) {
                if (
                  parseInt(time[i]) >= parseInt(place.hours[0].open.time) &&
                  (parseInt(time[i]) < parseInt(place.hours[0].close.time) ||
                    parseInt(place.hours[0].close.time) <= parseInt('0600'))
                ) {
                  var startTime = time[i]
                  if (time[i + 2] && time[i + 2] !== 'x') {
                    var endTime = time[i + 2]
                    itinerary[dayIdx][startTime + ' - ' + endTime] = place
                    time[i] = 'x'
                    time[i + 1] = 'x'
                    time[i + 2] = 'x'
                    break outerloop
                  }
                }
              } else if (
                parseInt(time[i]) >= parseInt(place.hours[0].open.time)
              ) {
                var startTime = time[i]
                if (time[i + 2] && time[i + 2] !== 'x') {
                  var endTime = time[i + 2]
                  itinerary[dayIdx][startTime + ' - ' + endTime] = place
                  time[i] = 'x'
                  time[i + 1] = 'x'
                  time[i + 2] = 'x'
                  break outerloop
                }
              }
            } else {
              var startTime = time[i]
              if (time[i + 2] && time[i + 2] !== 'x') {
                var endTime = time[i + 2]
                itinerary[dayIdx][startTime + ' - ' + endTime] = place
                time[i] = 'x'
                time[i + 1] = 'x'
                time[i + 2] = 'x'
                break outerloop
              }
            }
          }
          i++
        }
        dayIdx++
      }
    }
    res.json(itinerary)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Place}]
    })
    res.json(itinerary)
  } catch (error) {
    next(error)
  }
})

// route that saves a user's itinerary
router.post('/:userId', async (req, res, next) => {
  try {
    const data = req.body.itinerary
    const selected = req.body.selected

    const title =
      selected[0].name + ' and ' + (selected.length - 1) + ' more...'
    // creates new instance in the Itinerary table
    const itinerary = await Itinerary.create({
      city: title,
      arrival: req.body.dates.start,
      departure: req.body.dates.end,
      // timeOfStay: null,
      userId: req.params.userId
    })

    Object.keys(data).forEach(async day => {
      Object.keys(data[day]).forEach(async time => {
        var place = data[day][time]
        await Place.findOrCreate({
          where: {
            id: place.place_id
          },
          defaults: {
            id: place.place_id,
            name: place.name,
            city: 'Default',
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            formattedAddress: place.vicinity,
            rating: place.rating,
            priceLevel: place.price_level,
            utc: -300,
            website: 'default.com',
            photoUrl:
              'https://st3.depositphotos.com/2001403/15338/i/1600/depositphotos_153386640-stock-photo-vacation-background-with-pineapple.jpg'
          }
        })
        await ItineraryPlace.create({
          itineraryId: itinerary.dataValues.id,
          placeId: place.place_id,
          dayIndicator: day,
          timeIndicator: time
        })
      })
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
  }
})
