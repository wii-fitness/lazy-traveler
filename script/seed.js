'use strict'

const db = require('../server/db')
const {
  User,
  Place,
  Itinerary,
  ItineraryPlace,
  OpenClose
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Phillip',
      lastName: 'Fry',
      email: 'pfry@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Turanga',
      lastName: 'Leela',
      email: 'tleela@gmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Bender',
      lastName: 'Rodriguez',
      email: 'brodriguez@gmail.com',
      password: '123'
    })
  ])

  const place = await Promise.all([
    Place.create({
      name: 'Times Square',
      rating: 4.7,
      openingHours: [{date: new Date()}],
      formattedAddress: '1472 Broadway, New York, NY 10036',
      city: 'New York City',
      longitude: 40.769,
      latitude: 73.9845,
      // interestType: ['museum', 'tourist_attraction'],
      utc: -300,
      website: 'timessquarenyc.org',
      phoneNumber: '(732)-940-9999',
      priceLevel: 4,
      photoUrl: 'url.com',
      googlePlaceId: 'abcd123'
    }),
    Place.create({
      name: 'MOMA',
      rating: 5,
      openingHours: [{date: new Date()}],
      formattedAddress: '5555 Broadway, New York, NY 10036',
      city: 'New York City',
      longitude: 45.769,
      latitude: 72.9845,
      // interestType: ['museum', 'art_gallery'],
      utc: -300,
      website: 'moma.org',
      phoneNumber: '(732)-940-8888',
      priceLevel: 2,
      photoUrl: 'url.com',
      googlePlaceId: 'abcd234'
    }),
    Place.create({
      name: 'The Metropolitan Museum of Art',
      rating: 5,
      openingHours: [{date: new Date()}],
      formattedAddress: '5 Hanover Square, New York, NY 10036',
      city: 'New York City',
      longitude: 43.769,
      latitude: 72.9845,
      // interestType: ['museum', 'art_gallery'],
      utc: -300,
      website: 'met.org',
      phoneNumber: '(732)-940-7777',
      priceLevel: 3,
      photoUrl: 'url.com',
      googlePlaceId: 'abc345'
    })
  ])

  const itinerary = await Promise.all([
    Itinerary.create({
      userId: 1,
      arrival: '2019-11-01',
      departure: '2019-11-02',
      timeOfStay: 1
    }),
    Itinerary.create({
      userId: 2,
      arrival: '2019-11-01',
      departure: '2019-11-02',
      timeOfStay: 1
    }),
    Itinerary.create({
      userId: 3,
      arrival: '2019-11-01',
      departure: '2019-11-02',
      timeOfStay: 1
    })
  ])

  const itineraryPlace = await Promise.all([
    ItineraryPlace.create({
      itineraryId: 1,
      placeId: 1,
      timestamp: 1
    }),
    ItineraryPlace.create({
      itineraryId: 1,
      placeId: 2,
      timestamp: 2
    }),
    ItineraryPlace.create({
      itineraryId: 1,
      placeId: 3,
      timestamp: 2
    })
  ])

  const openClose = await Promise.all([
    OpenClose.create({
      placeId: 1,
      day: 1,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 2,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 3,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 4,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 5,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 6,
      open: '20:00:00',
      close: '20:00:00'
    }),
    OpenClose.create({
      placeId: 1,
      day: 7,
      open: '20:00:00',
      close: '20:00:00'
    })
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
