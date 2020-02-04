const router = require('express').Router()
const {Place} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      order: [['rating', 'DESC']]
    })
    res.json(places)
  } catch (err) {
    next(err)
  }
})

router.get('/:placeId', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        id: req.params.placeId
      },
      order: [['rating', 'DESC']]
    })
    // console.log(req.params.location)
    res.json(places)
  } catch (err) {
    next(err)
  }
})

// router.get(
//   '/:location',
//   async (req, res, next) => {
//     try {
//       const location = req.params.location
//       const interest = req.params.interest
//       const interest2 = req.params.interest2
//       const interest3 = req.params.interest3

//       const places = await Place.findAll({
//         where: {
//           city: location,
//           interestType: {
//             [Op.or]: [
//               {[Op.contains]: [interest]},
//               {[Op.contains]: [interest2]},
//               {[Op.contains]: [interest3]}
//             ]
//           }
//         },
//         order: [['rating', 'DESC']]
//       })
//       res.json(places)
//     } catch (err) {
//       next(err)
//     }
//   }
// )
