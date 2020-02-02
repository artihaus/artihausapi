const mongoose = require('mongoose')

const ImagesSchema = new mongoose.Schema({
    
    project_id: { type: mongoose.Schema.ObjectId, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true },
    url: { type: String, required: false },
    //ref refers to job, issue, payment
    ref: { type: String, required: false },

}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Images = mongoose.model('Artipro_Images', ImagesSchema)

module.exports = Artipro_Images