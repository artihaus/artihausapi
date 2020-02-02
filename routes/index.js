const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

const ArtihausUsersRoute = require('./api/artihaus-users-route')

// API Routes
router.get('/', function(req, res){
    res.render('index')
})

router.use('/users', ArtihausUsersRoute)

// If no API routes are hit, send the app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

module.exports = router;