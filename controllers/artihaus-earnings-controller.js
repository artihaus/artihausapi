const db = require("../models");

// Defining methods for the jobController
module.exports = {

  create: (req, res) => {
    db.Artihaus_Earnings
      .create(req.body)
      .then(data => res.status(200).json({
        message: 'ArtiPro Earnings Create',
        data
      }))
      .catch(err => res.status(500).json(err));
  },

  read: (req, res) => {
    console.log(req.body)
    db.Artihaus_Earnings
      .find(req.body).sort({ created: -1 })
      .then(data => res.status(200).json({
        message: 'ArtiPro Earnings Read',
        data
      }))
      .catch(err => res.status(500).json(err));
  },

  read_id: (req, res) => {
    const { _id } = req.params
    db.Artihaus_Earnings
      .find({ _id })
      .then(data => res.status(200).json({
        message: 'ArtiPro Earnings Read By Id',
        data
      }))
      .catch(err => res.status(500).json(err));
  },

  update: (req, res) => {
    const { _id } = req.body
    db.Artihaus_Earnings
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(data => res.status(200).json({
        message: 'ArtiPro Earnings Update',
        data
      }))
      .catch(err => res.status(500).json(err))
  },

  delete: (req, res) => {
    db.Artihaus_Earnings
      .findById({ _id: req.body.id })
      .then(data => data.remove())
      .then(data => res.status(200).json({
        message: 'ArtiPro Earnings Delete',
        data
      }))
      .catch(err => res.status(500).json(err));
  }
};
