import { getCollection } from '../db'
import assert from 'assert'
import { Trip } from '../../models/Trip'

const collection = getCollection('trips')

const buildTrip = (mongoTrip) => {
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
  },

  getAll() {
    return new Promise((resolve, reject) => {
      collection.find().toArray((err, trips) => {
        if(err) reject(err.message)
        else resolve(trips.map(buildTrip))
      })
    })
  },

  getOne(id){
    return new Promise((resolve, reject) => {
      const query = {"id": id}
      collection.findOne(query, (err, trip) => {
        if(err) reject(err)
        resolve(buildTrip(trip))
      })
    })

  },

  remove(id){
    return new Promise((resolve, reject) => {
      const query = {"id" : id}
      collection.remove(query, (err, trip) => {
        if(err) reject(err)
        resolve()
      })
    })

  },

  update(id){
    return new Promise ((resolve, reject) => {
      const query = {"id": id}
      collection.update(query, (err, trip) => {
        if(err) reject(err)
        resolve(buildTrip(trip))
      })
    })
  }


}
