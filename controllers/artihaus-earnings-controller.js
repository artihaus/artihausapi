const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    db.Artihaus_Earnings
      .create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  read: (req, res) => {
    db.Artihaus_Earnings
      .find(req.body).sort({ created: -1 })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  read_date_range: (req, res) => {
    const { start, end } = req.body
    db.Artihaus_Earnings
      .find({
        createdAt: { "$gte": start, "$lt": end}
      }).sort({ createdAt: -1 })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  read_id: (req, res) => {
    const { _id } = req.params
    db.Artihaus_Earnings
      .find({ _id })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    db.Artihaus_Earnings
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  },

  delete: (req, res) => {
    db.Artihaus_Earnings
      .findById({ _id: req.body.id })
      .then(data => data.remove())
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  }
};
