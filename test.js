const assert = require('assert');
const Guy = require('./classes/guy').Guy;
const HipsterGuy = require('./classes/guy').HipsterGuy;
const Car = require('./classes/car').Car;
const HipsterCar = require('./classes/car').HipsterCar;
const Location = require('./classes/location').Location
const Booking = require('./classes/booking').Booking;
const distance = require('./utils').distance;
const fuber = require('./fuber');

// Normal user will get closest car
function testClosestCab() {
  const cars = require('./init');
  const user_location = new Location(13, 14);
  var car = fuber.testfindClosestCab(user_location, cars);
  assert(car.getCarId() === 'CarA', 'testClosestCab Failed');
}

// Hipster user will get closest hipster car
function testClosestHipsterCab() {
  const cars = require('./init');
  const user_location = new Location(13, 14);
  var car = fuber.testfindClosestCab(user_location, cars, 'hipster');
  assert(car.getCarId() === 'CarHD', 'testClosestHipsterCab Failed');
}

// Allot car on booking request
var booking_id;
function testStartTrip() {
  var test_data = {
    pickup: '13,14',
    drop: '19,18',
    name: 'testy'
  }
  var booking = fuber.startTrip(test_data);
  booking_id = booking.booking_id;

  var new_rec = fuber.testRecords();
  assert(new_rec.available_cars.length == 12, 'testStartTrip 1 Failed');
  assert(new_rec.bookings[`${test_data.name}_${booking_id}`], 'testStartTrip 2 Failed');
  assert(new_rec.bookings[`${test_data.name}_${booking_id}`].car.getWaiting() == false, 'testStartTrip 3 Failed');
}

// Free car on trip end request
function testEndTrip() {
  var test_data = {
    name: 'testy',
    booking_id: booking_id
  }
  var prev_rec = fuber.testRecords();
  var drop_loc = prev_rec.bookings[`${test_data.name}_${booking_id}`].drop;
  console.log(drop_loc);
  var res = fuber.endTrip(test_data);
  var new_rec = fuber.testRecords();
  assert(new_rec.available_cars.length == 13, 'testEndTrip 1 Failed');
  assert(!new_rec.bookings[`${test_data.name}_${booking_id}`], 'testEndTrip 1 Failed');
  assert(new_rec.available_cars[12].getCarLocation() == drop_loc, 'testEndTrip 2 Failed');
  assert(new_rec.available_cars[12].getWaiting() == true, 'testEndTrip 3 Failed');
}

// Fetch all available cars
function testGetAllCars() {
  assert(fuber.getAllCars().length == 13, 'testGetAllCars Failed');
}

// Test fare of trip
function testCalcFare() {
  var d_loc = new Location(13, 14);
  var p_loc = new Location(18, 19);
  var c_loc = new Location(13, 13);
  var car = new Car('a', c_loc);
  var hcar = new HipsterCar('ha', c_loc);
  var user = new Guy('g1');

  var booking_1 = new Booking(car, user, p_loc, d_loc);
  var booking_2 = new Booking(hcar, user, p_loc, d_loc);

  assert(booking_1.calcFare() == 100, 'testCalcFare 1 Failed');
  assert(booking_2.calcFare() == 105, 'testCalcFare 2 Failed');
}

testClosestCab();
testClosestHipsterCab();
testGetAllCars();
testStartTrip();
testEndTrip();
testCalcFare();
