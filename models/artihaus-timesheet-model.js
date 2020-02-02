const mongoose = require('mongoose')

const TimeSheetSchema = new mongoose.Schema({
    
    project_id: { type: mongoose.Schema.ObjectId, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true },
    started: { type: Date, required: true },
    finished: { type: Date, required: false },
    status: { type: Boolean, required: true },
    isArtipro: { type: Boolean, require: true},
    isUploaded: { type: Boolean },

}, { timestamps: true, lowercase: true, trim: true })

const Artipro_TimeSheet = mongoose.model('Artipro_TimeSheet', TimeSheetSchema)

module.exports = Artipro_TimeSheet