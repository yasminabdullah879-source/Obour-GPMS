const express = require('express');
const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/add', projectController.addNewProject);
router.delete('/delete/:id', projectController.deleteProj);

module.exports = router;