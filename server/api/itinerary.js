const router = require('express').Router()
const {Itinerary, Place, ItineraryPlace, User} = require('../db/models')
const {Op} = require('sequelize')
const maps = require('@google/maps')
const dummyPlaces = require('../../client/dummyData/dummy')

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
  key: process.env.API_KEY,
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
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const places = req.body.places
    console.log('PLACES', req.body.places)
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
            console.log(place.hours)
          } else {
            place.hours = undefined
          }
          placesWithHours.push(place)
        })
        .catch(err => {
          console.log(err)
        })
    }

    const itinerary = {}

    console.log('DUMMY LENGTH', dummyPlaces.length)
    console.log('PLACES LENGTH', placesWithHours.length)

    var i = 0
    while (placesWithHours.length) {
      console.log('In outer loop')
      var place = placesWithHours.pop()
      while (i < times.length) {
        console.log('in inner loop')
        if (place.hours) {
          console.log('in first condition')
          console.log('Time', parseInt(times[i]))
          console.log('Open', parseInt(place.hours[0].open.time))
          //console.log('Close', parseInt(place.hours[0].close.time))
          if (!place.hours[0].close) {
            var startTime = times[i]
            var endTime = times[i + 2]
            i += 2
            itinerary[startTime + '-' + endTime] = place
            break
          }
          if (
            parseInt(times[i]) >= parseInt(place.hours[0].open.time) &&
            parseInt(times[i]) < parseInt(place.hours[0].close.time)
          ) {
            console.log('in second condition')
            var startTime = times[i]
            var endTime = times[i + 2]
            i += 2
            itinerary[startTime + '-' + endTime] = place
            break
          }
          i++
        } else {
          console.log('in third condition')
          var startTime = times[i]
          var endTime = times[i + 2]
          i += 2
          itinerary[startTime + '-' + endTime] = place
          break
        }
        i++
      }
    }
    console.log('ITINERARY', itinerary)

    //     while (i < times.length) {
    //       if (place.hours && place.hours[days[day]]) {
    //         if ((parseInt(times[i], 8) >= parseInt(place.hours[days[day].getDay()].open.time, 8)) && (parseInt(times[i], 8) < parseInt(place.hours[days[day].getDay()].close.time, 8))) {
    //           var startTime = times[i]
    //           var endTime = times[i + 2]
    //           i += 2
    //           itinerary[day][startTime + ' - ' + endTime] = place
    //           placesInDay += 1
    //           break
    //         }
    //         i++
    //       } else {
    //         var startTime = times[i]
    //         var endTime = times[i + 2]
    //         i += 2
    //         itinerary[day][startTime + ' - ' + endTime] = place
    //         placesInDay += 1
    //         break
    //       }
    //     }
    //     i++
    //   }
    //   day++

    // while (placesWithHours.length) {
    //   var place = placesWithHours.pop()
    //   var openHours = undefined
    //   var closeHours = undefined
    //   var openCloseHours = {}
    //   dayIdx = 0

    //   if (place.hours) {
    //     for (hour of place.hours) {
    //       openCloseHours[hour.open.day] = {}
    //       openCloseHours[hour.open.day]['open'] = hour.open.time
    //       if (hour.close) {
    //         openCloseHours[hour.open.day]['close'] = hour.close.time
    //       } else {
    //         openCloseHours[hour.open.day]['close'] = null
    //       }
    //     }
    //   }
    //   console.log(openCloseHours)

    // //   loop1: for (day of days) {
    //     itinerary[day.toISOString().split('T')[0]] = {}
    //     for (var [index, time] of times.entries()) {
    //       console.log('In loop')
    //       if (openCloseHours[day.getDay()]) {
    //         console.log('in first condition')
    //         if (parseInt(openCloseHours[day.getDay()].open, 8) >= parseInt(time, 8)) {
    //           console.log('in second condition')
    //           if (openCloseHours[day.getDay()].close) {
    //             console.log('in third condition')
    //             if (parseInt(time, 8) < parseInt(openCloseHours[day.getDay()].close, 8)) {
    //               console.log('in fourth condition')
    //               var startTime = time
    //               if (times[index+2]) {
    //                 var endTime = times[index + 2]
    //               } else {
    //                 var endTime = startTime
    //               }
    //               console.log(startTime)
    //               console.log(endTime)
    //               itinerary[day.toISOString().split('T')[0]][startTime + ' - ' + endTime] = place
    //               break loop1
    //             }
    //           } else {
    //             var startTime = time
    //             if (times[index+2]) {
    //               var endTime = times[index + 2]
    //             } else {
    //               var endTime = startTime
    //             }
    //             itinerary[day.toISOString().split('T')[0]][startTime + ' - ' + endTime] = place
    //             break loop1
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    console.log(itinerary)
    console.log('ITINERARY', itinerary)
    res.json(itinerary)

    //   while (day <= days.length) {
    //   itinerary[day] = {}
    //   var i = 0
    //   var placesInDay = 0
    //   while (placesInDay < 5) {
    //     var place = placesWithHours.pop()
    //     while (i < times.length) {
    //       if (place.hours && place.hours[days[day]]) {
    //         if ((parseInt(times[i], 8) >= parseInt(place.hours[days[day].getDay()].open.time, 8)) && (parseInt(times[i], 8) < parseInt(place.hours[days[day].getDay()].close.time, 8))) {
    //           var startTime = times[i]
    //           var endTime = times[i + 2]
    //           i += 2
    //           itinerary[day][startTime + ' - ' + endTime] = place
    //           placesInDay += 1
    //           break
    //         }
    //         i++
    //       } else {
    //         var startTime = times[i]
    //         var endTime = times[i + 2]
    //         i += 2
    //         itinerary[day][startTime + ' - ' + endTime] = place
    //         placesInDay += 1
    //         break
    //       }
    //     }
    //     i++
    //   }
    //   day++
    // }
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
