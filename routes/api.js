let express = require('express');

let router = express.Router();

//Imported Controllers
const userController = require('../Controllers/userController');

// router.get('/test', userController.test) 

router.post('/create_user', userController.create_user);
router.post('/login', userController.login);


module.exports = router