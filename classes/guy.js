class Guy {
  constructor(_id) {
    this._id = _id;
  }

  getId(){
    return this._id;
  }
}

class HipsterGuy extends Guy {
  constructor(_id, hipster=true) {
    super(_id);
    this.hipster = hipster;
  }
}

module.exports = {
  Guy,
  HipsterGuy
};
