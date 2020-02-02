const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    db.Artihaus_Expenses
      .create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(422).json(err));
  },

  read: (req, res) => {
    console.log(req.body)
    db.Artihaus_Expenses
      .find(req.body).sort({ created: -1 })
      .then(data => res.status(200).json({
        message: 'ArtiPro Expenses Read',
        data
      }))
      .catch(err => res.status(500).json(err));
  },

  read_id: (req, res) => {
    const { _id } = req.params
    console.log(req.params)
    db.Artihaus_Expenses
      .find({ _id })
      .then(data => res.status(200).json({
        message: 'ArtiPro Expenses Read',
        data
      }))
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    console.log(req.body)
    db.Artihaus_Expenses
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(422).json(err))
  },

  delete: (req, res) => {
    console.log(req.body)
    db.Artihaus_Expenses
      .findById({ _id: req.body.id })
      .then(data => data.remove())
      .then(data => res.status(200).json(data))
      .catch(err => res.status(422).json(err));
  }
};