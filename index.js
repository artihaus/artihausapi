//Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 8080

// Initialize Express
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'))

//Set handlebars
const expHbs = require('express-handlebars')
app.engine('handlebars', expHbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname, 'views'))

require('./routes/html-routes')(app);

// Start the server
app.listen(PORT, function () {
    console.log('App running on port ' + PORT + '!')
})

