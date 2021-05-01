let express = require('express');

let router = express.Router();

//Imported Controllers
const userController = require('../Controllers/userController');
const tvControllers = require('../Controllers/tvControllers');

/*userControllers */
router.post('/create_user', userController.create_user);
router.post('/login', userController.login);

/*tvControllers */
router.post('/track_tv_show', tvControllers.trackTvShow);
router.get('/get_tracked_shows/:id', tvControllers.getTrackedShows);

module.exports = router