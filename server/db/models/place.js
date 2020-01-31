const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.FLOAT
    //DO WE NEED TO ALLOWNULL:FALSE??
  },
  openingHours: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  formattedAddress: {
    type: Sequelize.STRING
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
  interestType: {
    type: Sequelize.ARRAY(Sequelize.STRING)
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
  phoneNumber: {
    type: Sequelize.STRING
  },
  priceLevel: {
    type: Sequelize.INTEGER
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
