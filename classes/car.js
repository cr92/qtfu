class Car {
  constructor(car_id, car_location, waiting = true) {
    this.car_id = car_id;
    this.car_location = car_location;
    this.waiting = waiting;
  }

  setCarLocation(car_location) {
    this.car_location = car_location;
  }

  setWaiting(waiting = false) {
    this.waiting = waiting;
  }

  getCarLocation() {
    return this.car_location;
  }

  getWaiting() {
    return this.waiting;
  }

  getCarId() {
    return this.car_id;
  }
}

class HipsterCar extends Car {
  constructor(name, position, waiting = true, hipster = true) {
    super(name, position, waiting = true);
    this.hipster = hipster;
  }
}

module.exports = {
  Car,
  HipsterCar
};
