//Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes')

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
app.set('views', path.join(__dirname, 'views'))

app.use(routes)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Artipro'
mongoose.Promise = Promise
mongoose.connect(MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(res => console.log('MongoDB is running!'))
  .catch(err => console.log(err))

// Start the server
app.listen(PORT, function () {
    console.log('App running on port ' + PORT + '!')
})

