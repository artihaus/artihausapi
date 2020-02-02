module.exports = function(app) {
    app.get('/', function(req, res) {
      res.render('index')
    })
  
    app.get('/comp_pdf/:_id', function(req, res) {
      res.render( 'comp_pdf' )
    })
  };