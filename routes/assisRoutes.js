const express = require('express');
const assisController = require('./../controllers/assisController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.post('/add', assisController.addAssis);
router.delete('/rem/:id', assisController.remAssis);
router.post('/assign', assisController.assignToProj);
router.post('/book', assisController.bookRoomTime);

module.exports = express.router;