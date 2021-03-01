const cars = require('./cars-model')
var vinValidator = require('vin-validator')
exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await cars.getById(req.params.id)
    if (car) {
      req.car = car
      next()
    } else {
      res.status(404).json({
        message: `car with id ${car.id} is not found`
      })
    }
  } catch (err) {
    next(err)
  }
}


exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    return res.status(400).json({
      message: "required field is missing"
    })
}
next()
}


exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  var isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
  next()
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
  let dbVins = await cars.getAll()


  dbVins = dbVins.filter((newVin) => {
    return req.body.vin === newVin.vin
  })

  if (dbVins.length >= 1) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next()
  }
} catch (err) {
  next(err)
}
}