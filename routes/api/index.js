const router = require('express').Router()

const ArtihausWebAppRoute = require('./artihaus-web-app-route')

const ArtihausUsersRoute = require('./artihaus-users-route')


//routes
router.use( '/', ArtihausWebAppRoute )

router.use( '/user', ArtihausUsersRoute )

module.exports = router;