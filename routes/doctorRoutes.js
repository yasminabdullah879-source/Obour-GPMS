const express = require('express');
const doctorController = require('./../controllers/doctorController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/add', doctorController.addDoctor);
router.delete('/rem/:id', doctorController.removeDoctor);
router.patch('/upd/:id', doctorController.updateDoctor);

module.exports = router;