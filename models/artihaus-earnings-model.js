const mongoose = require('mongoose')

const EarningsSchema = new mongoose.Schema({
    
    project_id: { type: mongoose.Schema.ObjectId, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true },
    amount: { type: Number, required: false },
    category: { type: String, required: false },
    size: { type: Number, required: false },
    details: { type: String, required: false },
    status: { type: Boolean, required: false },
    paidAt: { type: Date, required: false },
    isUploaded: { type: Boolean  },

}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Earnings = mongoose.model('Artipro_Earnings', EarningsSchema)

module.exports = Artipro_Earnings