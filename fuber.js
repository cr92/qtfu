const Guy = require('./classes/guy').Guy;
const HipsterGuy = require('./classes/guy').HipsterGuy;
const Car = require('./classes/car').Car;
const HipsterCar = require('./classes/car').HipsterCar;
const Location = require('./classes/location').Location
const Booking = require('./classes/booking').Booking;
const distance = require('./utils').distance;

const cars = require('./init');

const records = {
  available_cars: cars,
  bookings: {},

  removeFromAvailableCars: function (car_id) {
    this.available_cars = this
      .available_cars
      .filter(function (x) {
        return x.getCarId() != car_id;
      });
  },

  addToAvailableCars: function (car) {
    this
      .available_cars
      .push(car);
  },

  addToBookings: function (booking) {
    this.bookings[
      `${booking
        .user
        .getId()}_${booking
        .booking_id}`
    ] = booking;
  },

  removeFromBookings: function (id) {
    delete this.bookings[id];
  },

  getBookingById: function (id) {
    return this.bookings[id];
  }
}

function startTrip(data) {
  var p_x = parseFloat(data.pickup.split(',')[0]);
  var p_y = parseFloat(data.pickup.split(',')[1]);
  var d_x = parseFloat(data.drop.split(',')[0]);
  var d_y = parseFloat(data.drop.split(',')[1]);
  var _id = data.name;
  var type = data.type;

  var pickup = new Location(p_x, p_y);
  var drop = new Location(d_x, d_y);
  var user = userFactory(_id, type);
  var booked_car = findClosestCab(pickup, records.available_cars, type);

  if (!booked_car) {
    return {status: 'no cars available'}
  } else {
    booked_car.setWaiting(false);
    records.removeFromAvailableCars(booked_car.getCarId());
    var booking = new BookingFactory(booked_car, user, pickup, drop);
    records.addToBookings(booking);
    console.log('-------------TRIP START----->>>');
    console.log(records);
    console.log('<<<-----TRIP START-------------');
    return booking;
  }
}

function endTrip(data) {
  var _id = data.name;
  var booking_id = data.booking_id;
  var booking = records.getBookingById(`${_id}_${booking_id}`);
  var fare = booking.calcFare();
  var car = booking.car;

  car.setWaiting(true);
  car.setCarLocation(booking.drop);
  records.addToAvailableCars(car);
  records.removeFromBookings(`${_id}_${booking_id}`);
  console.log('-------------TRIP END----->>>');
  console.log(records);
  console.log('<<<-----TRIP END-------------');
  return {fare};
}

function getAllCars() {
  return records.available_cars;
}

function findClosestCab(pickup, cars, user_type) {
  var cars_x;

  if (user_type == 'hipster') {
    cars_x = cars.filter(function (x) {
      return x.hipster == true;
    })
  } else {
    cars_x = cars;
  }

  cars_x
    .sort(function (a, b) {
      var dpa = distance(pickup, a.getCarLocation());
      var dpb = distance(pickup, b.getCarLocation());
      return dpa - dpb;
    })
  var booked_car = cars_x[0];
  return booked_car;
}

function userFactory(_id, type) {
  if (type == 'hipster') {
    return new HipsterGuy(_id, true);
  } else {
    return new Guy(_id);
  }
}

function BookingFactory(car, user, pickup, drop) {
  return new Booking(car, user, pickup, drop);
}

module.exports = {
  startTrip,
  endTrip,
  getAllCars,

  testfindClosestCab: findClosestCab,
  testRecords: function () {
    return records;
  }
}

// localhost:9000/user/start?name=loofah&pickup=12,13&drop=13,18&type=hipster
// localhost:9000/user/end?name=loofah&booking_id=5wvcr9m11dkxweyti22u8lg14i
