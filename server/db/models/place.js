const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  //   name: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //     validate: {
  //       notEmpty: true
  //     }
  //   },
  //   price: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //     validate: {
  //       notEmpty: true
  //     }
  //   },
  //   inventoryQty: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //     validate: {
  //       notEmpty: true
  //     }
  //   },
  //   description: {
  //     type: Sequelize.TEXT,
  //     allowNull: false,
  //     validate: {
  //       notEmpty: true
  //     }
  //   },
  //   image: {
  //     type: Sequelize.TEXT,
  //     allowNull: false,
  //     validate: {
  //       isURL: true
  //     },
  //     defaultValue:
  //       'https://9to5mac.com/wp-content/uploads/sites/6/2019/11/apple_kawasaki_coming_soon.jpg?quality=82&strip=all&w=1600'
  //   }
})

module.exports = Place
