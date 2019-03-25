const router = require('express').Router();
const Authenticated = require('../middlewares/auth');
const HourController = require('../controllers/hour');

router.get('/', Authenticated,HourController.getHours);

router.get('/today',[Authenticated], HourController.getHoursOftheDay);

router.get('/history',[Authenticated], HourController.getHistoryHours);

router.post('/', Authenticated, HourController.addHour);

router.get('/:id(\\d+)/', Authenticated, HourController.getHour);

router.put('/:id(\\d+)/', Authenticated, HourController.updateHour);

router.delete('/:id(\\d+)/', Authenticated, HourController.removeHour);

module.exports = router;