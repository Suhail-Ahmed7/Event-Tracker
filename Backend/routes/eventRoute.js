const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, eventController.getAllEvents);
router.get('/:id', verifyToken, eventController.getEventById);
router.post('/', verifyToken, eventController.createEvent);
router.put('/:id', verifyToken, eventController.updateEventById);
router.delete('/:id', verifyToken, eventController.deleteEventById);

module.exports = router;