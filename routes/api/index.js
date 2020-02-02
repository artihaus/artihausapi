const router = require('express').Router()

const ArtihausUsersRoute = require('./artihaus-users-route')
const ArtihausWebAppRoute = require('./artihaus-web-app-route')
const ArtihausEarningsRoute = require('./artihaus-earnings-route')
const ArtihausExpensesRoute = require('./artihaus-expenses-route')
const ArtihausProjectsRoute = require('./artihaus-projects-route')
const ArtihausTimeSheetRoute = require('./artihaus-timesheet-route')


//routes
router.use( '/user', ArtihausUsersRoute )

router.use('/earnings',ArtihausEarningsRoute)

router.use('/expenses', ArtihausExpensesRoute)

router.use('/projects', ArtihausProjectsRoute)

router.use('/timesheet', ArtihausTimeSheetRoute)

module.exports = router;