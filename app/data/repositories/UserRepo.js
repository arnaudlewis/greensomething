import { getCollection } from '../db'

const collection = getCollection('users')

export default {

  byCredentials (identifier) {
    new Promise((resolve, reject) => {
      const query = { "email": identifier }
      collection.findOne(query, (err, user) => {
        if(err) reject(err)
        else resolve( new User(user._id, user.email, user.password))
      })
    })
  }
}
