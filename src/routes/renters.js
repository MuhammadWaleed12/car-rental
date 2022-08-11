const express = require("express");
const Renters = require("../db/models/renters");
const{createRenters,loginRenters,logoutRenters,logoutAllRenters,addCar}=require('../controllers/renters')
const auth=require('../middleware/auth')
const router = new express.Router();

router.post('/signup',createRenters)
router.post('/login',loginRenters)
router.post('/logout',auth,logoutRenters)
router.post('/logoutAll',auth,logoutAllRenters)
router.post('/addCar',auth,addCar)
router.get('/cars',getCars)
module.exports = router;
