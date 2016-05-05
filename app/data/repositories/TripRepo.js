import { getCollection } from '../db'

const collection = getCollection('trips')

const buildUser = (mongoTrip) => {
  return new Trip (
    mongoTrip._id,
    mongoTrip.departure,
    mongoTrip.arrival,
    mongoTrip.date,
    mongoTrip.nPlace,
    mongoTrip.driver,
    mongoTrip.price
  )
}

export default {

  insert(trip) {
    return new Promise((resolve, reject) => {
      collection.insert(trip.toJson(), (err) => {
        if(err) reject(err.message)
        resolve()
      })
    })
  }
}
