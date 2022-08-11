const Renters = require("../db/models/renters");
const Car = require("../db/models/car");
// @desc Signup Renters
// @route /renters
// @access Public

exports.createRenters = async (req, res) => {
  const renters = new Renters(req.body);
  try {
    await renters.save();
    const token = await renters.generateAuthToken();
    res.status(201).send({ renters, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
exports.loginRenters = async (req, res) => {
  try {
    const renter = await Renters.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await renter.generateAuthToken();
    res.send({ renter, token });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};
exports.logoutRenters = async (req, res) => {
  try {
    req.renters.tokens = req.renters.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.renters.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
exports.logoutAllRenters = async (req, res) => {
  try {
    req.renters.tokens = [];
    await req.renters.save();
  } catch (e) {
    res.status(500).send();
  }
};
exports.addCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    await car.save();
    res.status(201).send(car);
  } catch (e) {
    console.log(e);
    res.send(400).send();
  }
};
exports.getAllCars=async(req,res)=>{
    try{
const cars=await Cars.find({})
res.send(cars)
    }
    catch(e){
res.status(500).send()
    }
}