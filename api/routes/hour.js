const router = require('express').Router();
const Authenticated = require('../middlewares/auth');
const HourController = require('../controllers/hour');

router.get('/', HourController.getHours);

router.get('/today',[Authenticated], HourController.getHoursOftheDay);

router.post('/', HourController.addHour);

router.get('/:id(\\d+)/', HourController.getHour);

router.put('/:id(\\d+)/', HourController.updateHour);

router.delete('/:id(\\d+)/', HourController.removeHour);

module.exports = router;