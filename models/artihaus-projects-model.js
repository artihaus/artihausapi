const mongoose = require('mongoose')

const ProjectsSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true },
    address: { type: String, required: true },
    address2: { type: String, required: false },
    city_code: { type: Number, required: true },
    client_id: { type: mongoose.Schema.ObjectId, required: true },
    status: { type: Boolean, required: true },
    started: { type: Date, required: true },
    finished: { type: Date, required: false },
    isUploaded: { type: Boolean }

}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Projects = mongoose.model('Artipro_Projects', ProjectsSchema)

module.exports = Artipro_Projects