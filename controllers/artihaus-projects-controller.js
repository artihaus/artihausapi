const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    db.Artihaus_Projects
      .create(req.body)
      .then(data => {
        res.status(200).json({
          message: 'ArtiPro Projects Create',
          data
        })
    })
      .catch(err => res.status(422).json(err));
  },

  read: (req, res) => {
    db.Artihaus_Projects
      .find(req.body).sort({ started: -1 })
      .then(data => {
        res.status(200).json({
          message: 'ArtiPro Projects Read',
          data
        })
    })
      .catch(err => res.status(422).json(err));
  },

  read_id: (req, res) => {
    const { _id } = req.params
    db.Artihaus_Projects
      .find({ _id })
      .then(data => {
        res.status(200).json({
          message: 'ArtiPro Projects Read By Id',
          data
        })
    })
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    delete req.body._id
    db.Artihaus_Projects
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => {
        res.status(200).json({
          message: 'ArtiPro Projects Update',
          data
        })
    })
      .catch(err => res.status(422).json(err))
  },

  delete: (req, res) => {
    db.Artihaus_Projects
      .findById({ _id: req.body.id })
      .then(data => data.remove())
      .then(data => {
        res.status(200).json({
          message: 'ArtiPro Projects Delete',
          data
        })
    })
      .catch(err => res.status(422).json(err));
  },
};
