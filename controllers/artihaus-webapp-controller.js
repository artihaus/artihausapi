const db = require("../models");

// Defining methods for the jobController
module.exports = {

  home: (req, res) => {
    db.Artihaus_Users
      .find(req.body)
      .then(data => res.render('home') )
      .catch(err => res.status(500).json(err));
  },
};
