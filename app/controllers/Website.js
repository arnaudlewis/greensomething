import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import { User } from '../models/User'

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
        trip_car: req.query.trip_car,
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
    let car = req.body.car
    let nPlace = req.body.nPlace
    let driver = req.body.driver
    let price = req.body.price

    const errorUrl = (message) => {
      return Router.withQueryString(
        Router.tripview,
        {
          trip_error: message,
          "trip_departure": departure,
          "trip_arrival": arrival,
          "trip_date": date,
          "trip_car": car,
          "trip_nPlace": nPlace,
          "trip_driver": driver,
          "trip_price": price
        }
      )
    }

    if(!(departure && arrival && date && car && nPlace && driver && price)) res.redirect(errorUrl("You must provide all informations to add an travel"))

    const t = new Trip(null, departure, arrival, date, car, nPlace, driver, price)
    TripRepo.insert(t)
      .then(() => {
        res.redirect(Router.index)
      })
      .catch((errMessage) => {
        res.redirect(Router.withQueryString(errorUrl(errMessage)))
      })
    }
}
