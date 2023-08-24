const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate')
const PlayerController = require('../controllers/playercontroller')

router.get('/all', authenticate, PlayerController.leaderBoard);

module.exports = router;