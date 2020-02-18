const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  // using GoogleId
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    //COMES AS AN ARRAY from address components, NEED TO CONVERT IN BACK END
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  formattedAddress: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.FLOAT
    //DO WE NEED TO ALLOWNULL:FALSE??
  },
  priceLevel: {
    type: Sequelize.INTEGER
  },
  utc: {
    type: Sequelize.INTEGER
  },
  website: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  photoUrl: {
    //COMES AS AN ARRAY, NEED TO CONVERT IN BACK END
    //need to use photo reference & place photos API
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Place
