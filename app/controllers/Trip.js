import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import TripRepo from '../data/repositories/TripRepo'
import { Trip } from '../models/Trip'

export default {
  bookTrip(req, res) {
    if(!req.ctx) res.redirect(Router.authenticate)
    else {
      const tripId = req.query.tripId
      TripRepo.getOne(tripId)
        .then((trip) => {
          UserRepo.bookTrip(req.ctx._id, trip)
            .then(() => {
              res.sendStatus(200)
            })
            .catch((err) => {
              res.status(500).send("Unable to book trip")
            })
        })
        .catch((err) => {
          res.status(500).send(err.message)
        })
    }
  },

  tripview(req, res) {
    if(!req.ctx) res.redirect(Router.authenticate)
    else {
      res.render(
        'tripview',
        {
          trip_departure: req.query.trip_departure,
          trip_arrival: req.query.trip_arrival,
          trip_date: req.query.trip_date,
          trip_nPlace: req.query.trip_nPlace,
          trip_price: req.query.trip_price,
          trip_error: req.query.trip_error
        }
      )
    }
  },

  tripinsert(req, res) {

    if(!req.ctx) res.redirect(Router.authenticate)
    else {
        let departure = req.body.departure
        let arrival = req.body.arrival
        let date = req.body.date
        let nPlace = req.body.nPlace
        let price = req.body.price

        const errorUrl = (message) => {
          return Router.withQueryString(
            Router.tripview,
            {
              trip_error: message,
              "trip_departure": departure,
              "trip_arrival": arrival,
              "trip_date": date,
              "trip_nPlace": nPlace,
              "trip_price": price
            }
          )
        }

        if(!(departure && arrival && date && nPlace && price)) res.status(400).send("You must complete the form")
        const t = new Trip(null, departure, arrival, date, nPlace, req.ctx, price)

        TripRepo.insert(t)
          .then(() => {
            res.sendStatus(200)
          })
          .catch((errMessage) => {
            res.status(500).send(errMessage)
          })
    }
  },

  getAllTrip(req, res) {
    TripRepo.getAll()
      .then((tripList) => {
        res.render('triplist', {results: tripList})
      })
      .catch((errMessage) => {
        res.status(500)
      })
  }
}
