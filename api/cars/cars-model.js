const db = require('../../data/db-config')


const getAll = () => {
  // DO YOUR MAGIC
  return db.select("*").from('cars');
}


const getById = (id) => {
  // DO YOUR MAGIC
  return db.select("*")
  .from('cars')
  .where("id", id)
  .limit(1)
}


const create = async (cars) => {
  // DO YOUR MAGIC
  const [id] = await db
  .insert({
    vin: cars.vin,
    make: cars.make,
    model: cars.model,
    mileage: cars.mileage,
    title: cars.title,
    transmission: cars.transmission,
  })
  .into('cars')

  const newCar = await db('cars')
  .where("id", id)
  .first()

  return newCar
}

module.exports = {
  getAll,
  getById,
  create,
}