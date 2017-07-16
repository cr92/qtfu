const distance = require('../utils').distance;

class Booking {
  constructor(car, user, pickup, drop) {
    this.car = car;
    this.user = user;
    this.pickup = pickup;
    this.drop = drop;
    this.booking_id = Math.random().toString(36).slice(2);
  }

  calcFare() {
    if (this.car.hipster) {
      return distance(this.pickup, this.drop) * 2 + 5;
    } else {
      return distance(this.pickup, this.drop) * 2;
    }
  }
}

module.exports = {
  Booking
};
