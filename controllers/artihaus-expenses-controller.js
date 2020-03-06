const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    console.log(req.body)
    db.Artihaus_Expenses
      .create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => {
        res.status(422).json(err)
      });
  },

  read: (req, res) => {
    db.Artihaus_Expenses
      .find(req.body).sort({ createdAt: -1 })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  read_date_range: (req, res) => {
    const { start, end } = req.body
    db.Artihaus_Expenses
      .find({
        createdAt: { "$gte": start, "$lt": end}
      }).sort({ createdAt: -1 })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  read_id: (req, res) => {
    const { _id } = req.params
    db.Artihaus_Expenses
      .find({ _id })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    db.Artihaus_Expenses
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(422).json(err))
  },

  delete: (req, res) => {
    console.log('DELETE EXPENSE', req.body)
    db.Artihaus_Expenses
      .findOneAndDelete({ _id: req.body._id })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(422).json(err));
  }
};
