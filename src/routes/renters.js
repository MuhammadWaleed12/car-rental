const express = require("express");
const Renters = require("../db/models/renters");
const {
  createRenters,
  loginRenters,
  logoutRenters,
  logoutAllRenters,
  addCar,
  getSingleCar,
  updateCarInformation,
  deleteCar,
} = require("../controllers/renters");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/signup", createRenters);
router.post("/login", loginRenters);
router.post("/logout", auth, logoutRenters);
router.post("/logoutAll", auth, logoutAllRenters);
router.post("/addCar", auth, addCar);
router.get("/car/:id", auth, getSingleCar);
router.put("/car/:id", auth, updateCarInformation);
router.delete("/car/:id",auth, deleteCar);

// router.get('/cars',getCars)
module.exports = router;
