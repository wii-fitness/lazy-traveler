const User = require('./user')
const Itinerary = require('./itinerary')
const Place = require('./place')
const ItineraryPlace = require('./itinerary-place')
const OpenClose = require('./openclose')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Itinerary.belongsTo(User)
User.hasMany(Itinerary)

Place.belongsTo(OpenClose)
Place.belongsToMany(Itinerary, {through: ItineraryPlace})
Itinerary.belongsToMany(Place, {through: ItineraryPlace})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Itinerary,
  Place,
  ItineraryPlace,
  OpenClose
}
