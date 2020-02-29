const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    console.log(req.body)
    db.Artihaus_Clients
      .create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log( err )
        res.status(500).json(err)
      });
  },

  read: (req, res) => {
    db.Artihaus_Clients
      .find(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    delete req.body._id
    db.Artihaus_Clients
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },

  delete: (req, res) => {
    db.Artihaus_Clients
      .findById({ _id: req.body.id })
      .then(data => data.remove())
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  }
};
