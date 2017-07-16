const Car = require('./classes/car').Car;
const HipsterCar = require('./classes/car').HipsterCar;

const Location = require('./classes/location').Location;

const init_car = [
  new HipsterCar('CarHA', new Location(12, 20)),
  new HipsterCar('CarHB', new Location(12, 15)),
  new HipsterCar('CarHC', new Location(12, 18)),
  new HipsterCar('CarHD', new Location(14, 13)),
  new HipsterCar('CarHE', new Location(10, 15)),
  new Car('CarA', new Location(12, 14)),
  new Car('CarB', new Location(12, 15)),
  new Car('CarC', new Location(12, 18)),
  new Car('CarD', new Location(14, 13)),
  new Car('CarE', new Location(16, 13)),
  new Car('CarF', new Location(18, 14)),
  new Car('CarG', new Location(11, 16)),
  new Car('CarH', new Location(12, 13)),
]

module.exports = init_car;
