// DO YOUR MAGIC
const router = require('express').Router()
const cars = require('./cars-model')
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware')

router.get('/', async (req, res, next) => {
  try {
    const values = await cars.getAll()
    res.status(200).json(values)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.status(200).json(req.car)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
  try {
    const newCar = cars.create(req.body)
    res.status(201).json(newCar)
  } catch (err) {
    next(err)
  }
})

module.exports = router;