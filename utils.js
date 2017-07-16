// distances kept as square - for ease
module.exports = {
  distance: function (p1, p2) {
    return Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2);
  }
}