const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

const ArtihausWebAppRoute = require('./api/artihaus-webapp-route')
const ArtihausUsersRoute = require('./api/artihaus-users-route')
const ArtihausEarningsRoute = require('./api/artihaus-earnings-route')
const ArtihausExpensesRoute = require('./api/artihaus-expenses-route')
const ArtihausProjectsRoute = require('./api/artihaus-projects-route')
const ArtihausTimeSheetRoute = require('./api/artihaus-timesheet-route')

// API Routes
router.get('/', function(req, res){
    res.render('index')
})

router.use('/web', ArtihausWebAppRoute)

router.use('/users', ArtihausUsersRoute)

router.use('/earnings',ArtihausEarningsRoute)

router.use('/expenses', ArtihausExpensesRoute)

router.use('/projects', ArtihausProjectsRoute)

router.use('/timesheet', ArtihausTimeSheetRoute)

module.exports = router;