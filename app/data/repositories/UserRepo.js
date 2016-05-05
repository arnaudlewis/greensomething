import { getCollection } from '../db'
import { User } from '../../models/User'

const collection = getCollection('users')

const buildUser = (mongoUser) => {
  return new User (
    mongoUser.id,
    mongoUser.email,
    mongoUser.password,
    mongoUser.firstname,
    mongoUser.lastname,
    mongoUser.booked
  )
}

export default {

  checkEmailAvailable (email) {
    return new Promise((resolve, reject) => {
      const query = { "email": email }
      collection.findOne(query, (err, user) => {
        if(err) reject("Unable to check email")

        if(user) reject("email already taken")
        else resolve()
      })
    })
  },

  byCredentials (identifier) {
    return new Promise((resolve, reject) => {
      const query = { "email": identifier }
      collection.findOne(query, (err, user) => {
        if(err) reject(err)
        resolve(buildUser(user))
      })
    })
  },

  insert(user) {
    return new Promise((resolve, reject) => {
      collection.insert(user.toJson(), (err) => {
        if(err) reject(err.message)
        resolve()
      })
    })
  },

  bookTrip(userId, trip) {
    return new promise((resolve, reject) => {
      const selector = { "_id" : userId}
      const modifier = { "booked" : { $push: trip}}
      collection.updateOne(selector, modifier, (err, res) => {
        if(err) reject(err.message)
        else resolve()
      })
    })
  }
}
