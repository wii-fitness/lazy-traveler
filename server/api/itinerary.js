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

    const dayTimes = []

    for (day of days) {
      console.log(days)
      console.log('day', day)
      dayTimes.push(Array.from(times))
    }
    console.log('DAYTIMES', dayTimes)

    while (placesWithHours.length) {
      var place = placesWithHours.pop()
      //console.log('Place', place)
      var dayIdx = 0
      outerloop: while (dayIdx < times.length) {
        var i = 0
        console.log('dayidx', dayIdx)
        var time = dayTimes[dayIdx]
        console.log('TIIIIIMEEE', time)
        //console.log(time)
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
                  //console.log('in third condition')
                  var startTime = time[i]
                  if (time[i + 2] && time[i + 2] !== 'x') {
                    //console.log('in fourth condition')
                    //console.log(startTime)
                    var endTime = time[i + 2]
                    console.log(endTime)
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
                //console.log('in divergence')
                if (time[i + 2] && time[i + 2] !== 'x') {
                  //    console.log('divergence condition')
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
              //  console.log('in divergence')
              if (time[i + 2] && time[i + 2] !== 'x') {
                //  console.log('divergence condition')
                var endTime = time[i + 2]
                itinerary[dayIdx][startTime + ' - ' + endTime] = place
                time[i] = 'x'
                time[i + 1] = 'x'
                time[i + 2] = 'x'
                break outerloop
              }
            }
          }
          //console.log('Currenttime', time[i])
          //console.log('ALLTIMES', times)
          //console.log('Currentday', dayIdx)
          // console.log(i)
          //console.log(time)
          i++
        }
        dayIdx++
      }
    }

    // var i = 0
    // while (placesWithHours.length) {
    //   console.log('In outer loop')
    //   var place = placesWithHours.pop()
    //   while (i < times.length) {
    //     console.log('in inner loop')
    //     if (place.hours) {
    //       console.log('in first condition')
    //       if (
    //         parseInt(times[i], 8) >= parseInt(place.hours[0].open.time, 8) &&
    //         parseInt(times[i], 8) < parseInt(place.hours[0].close.time, 8)
    //       ) {
    //         console.log('in second condition')
    //         var startTime = times[i]
    //         var endTime = times[i + 2]
    //         i += 2
    //         itinerary[startTime + '-' + endTime] = place
    //         break
    //       }
    //       i++
    //     } else {
    //       console.log('in third condition')
    //       var startTime = times[i]
    //       var endTime = times[i + 2]
    //       i += 2
    //       itinerary[startTime + '-' + endTime] = place
    //       break
    //     }
    //     i++
    //   }
    // }
    // console.log('ITINERARY', itinerary)

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
      },
      include: [{model: Place}]
    })
    res.json(itinerary)
  } catch (err) {
    next(err)
  }
})

// route that saves a user's itinerary
router.post('/:userId', async (req, res, next) => {
  try {
    const data = req.body.places
    console.log('req.body.place', data)
    console.log('req.params.userId', req.params.userId)

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
