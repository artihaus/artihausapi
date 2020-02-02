const mongoose = require('mongoose')

const ExpensesSchema = new mongoose.Schema({

    project_id: { type: mongoose.Schema.ObjectId, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true },
    isArtipro: { type: Boolean, required: true },
    isApproved: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    isUploaded: { type: Boolean  },

}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Expenses = mongoose.model('Artipro_Expenses', ExpensesSchema)

module.exports = Artipro_Expenses