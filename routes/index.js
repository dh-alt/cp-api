const express = require('express');
const config = require('../config/config');

const authRoute = require('./auth.route');
const carRoute = require('./cars.route');
// const docsRoute = require('./docs.route');
const orderRoute = require('./orders.route');
const paymentEventRoute = require('./paymentEvents.route');
const promoCodeRoute = require('./promoCodes.route');
const timeslotRoute = require('./timeslots.route');
const userRoute = require('./users.route');
const vanRoute = require('./vans.route');

const router = express.Router();

/* TODO::DH Authorization on all routes */
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/cars',
    route: carRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/paymentEvents',
    route: paymentEventRoute,
  },
  {
    path: '/promoCodes',
    route: promoCodeRoute,
  },
  {
    path: '/timeslots',
    route: timeslotRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/vans',
    route: vanRoute,
  },
];

/*
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];
*/
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/*
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}
*/

module.exports = router;
