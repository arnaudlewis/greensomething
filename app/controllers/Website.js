import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import TripRepo from '../data/repositories/UserRepo'
import { User } from '../models/User'
import { Trip } from '../models/Trip'

export default {

  index(req,res){
    res.render('index')
  },

  authenticate(req, res) {
    if(req.ctx) res.redirect(Router.index)
    else {
      res.render(
        'authenticate',
        {
          signup_email: req.query.signup_email,
          signup_firstname: req.query.signup_firstname,
          signup_lastname: req.query.signup_lastname,
          signin_email: req.query.signin_email,
          signin_error: req.query.signin_error,
          signup_error: req.query.signup_error
        }
      )
    }
  },

  profile(req, res) {
    if(!req.ctx) res.redirect(Router.authenticate)
    else {
      res.render(
        'profile',
        {
          ctx: req.ctx
        }
      )
    }
  },

  tripview(req, res) {
    res.render(
      'tripview',
      {
        trip_departure: req.query.trip_departure,
        trip_arrival: req.query.trip_arrival,
        trip_date: req.query.trip_date,
        trip_nPlace: req.query.trip_nPlace,
        trip_driver: req.query.trip_driver,
        trip_price: req.query.trip_price,
        trip_error: req.query.trip_error
      }
    )
  },

  trip(req, res) {
    let departure = req.body.departure
    let arrival = req.body.arrival
    let date = req.body.date
    let nPlace = req.body.nPlace
    let price = req.body.price

    console.log(req.body)

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
}
