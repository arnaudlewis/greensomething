import { getCollection } from '../db'

const collection = getCollection('users')

export default {

  byCredentials (identifier, password) {
    new Promise((resolve, reject) => {
      const query = { $or: [ { "username": identifier }, { "email": identifier } ] }
      collection.findOne(query, (err, user) => {
        if(err) reject(err)
        else resolve(user)
      })
    })
  }
}
