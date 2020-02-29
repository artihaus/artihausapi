const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true,
    },

    address2: {
        type: String,
        required: false
    },

    zipcode: {
        type: Number,
        // required: true
    },

    client: {
        type: String,
        // required: true
    },

    description: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                auto: true,
                unique: true
            },
            category: {
                type: String,
                // required: true
            },
            size: {
                type: Number,
                required: false,
                default: null
            },
            amount: {
                type: Number,
                required: false,
                default: null
            },
            status: {
                type: Boolean,
                required: true,
                default: false
            },
            details: {
                type: String,
                required: false
            },
            paidAt: {
                type: Date,
                required: false
            }
        }
    ],

    images: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                required: true,
                auto: true,
                unique: true
            },
            category: {
                type: String,
                required: false,
            },
            comment: {
                type: String,
                required: false
            },
            imgURL: {
                type: String,
                require: false,
            }
        }
    ],

    expenses: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                auto: true,
                unique: true
            },
            category: {
                type: String,
                // required: true
            },
            subcategory: {
                type: String,
                // required: true
            },
            amount: {
                type: Number,
                // required: true
            },
            status: {
                type: Boolean,
                // required: true
            },
            createdBy: {
                type: String,
                // required: true
            },
            isArtipro: {
                type: Boolean,
                // required: true
            },
            createdAt: {
                type: Date,
                // required: true
            }
        }
    ],

    status: {
        type: Boolean,
        // required: true
    },

    started: {
        type: Date,
        // required: true
    },

    finished: {
        type: Date,
    },

}, { timestamps: true, lowercase: true, trim: true })

const Artihaus_Jobs = mongoose.model('Artihaus_Jobs', JobSchema)

module.exports = Artihaus_Jobs