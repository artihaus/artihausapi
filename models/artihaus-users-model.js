const mongoose = require('mongoose')

const UsersSchemaModel = new mongoose.Schema({
    //_id
    name: { type: String, unique: true, required: true },
    email: {
        type: String, unique: true, required: true, sparse: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: { type: String, required: false },
    contact: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
            type: { type: String, unique: false, required: false },
            number: { type: Number, unique: true, required: false },
            region: { type: String, required: false },
        }
    ],
    security_questions_answers: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
            question: { type: String, required: false },
            answer: { type: String, required: false }
        }
    ],
    projects: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
            name: { type: String, unique: true, required: true, sparse: true },
            client_id: { type: mongoose.Schema.ObjectId, required: true },
            address: { type: String, required: true },
            address2: { type: String, required: false },
            city_code: { type: Number, required: true },
            status: { type: Boolean, required: true },
            started: { type: Date, required: true },
            finished: { type: Date, required: false },
            details: [
                {
                    _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
                    category: { type: String, required: false },
                    size: { type: Number, required: false },
                    comments: { type: String, required: false },
                }
            ],
            earnings: [
                {
                    _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
                    details_id: { type: mongoose.Schema.ObjectId, required: true, sparse: true },
                    amount: { type: Number, required: true, default: 0 },
                    status: { type: Boolean, required: true },
                    paidAt: { type: Date, required: false },
                }
            ],
            expenses: [
                {
                    _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
                    category: { type: String, required: true },
                    subcategory: { type: String, required: true },
                    amount: { type: Number, required: true },
                    status: { type: Boolean, required: true },
                    createdBy: { type: String, required: true },
                    isArtipro: { type: Boolean, required: true },
                    isApproved: { type: Boolean, required: true },
                    createdAt: { type: Date, required: true },
                }
            ],
            images: [
                {
                    _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
                    url: { type: String, required: false },
                    //ref refers to job, issue, payment
                    ref: { type: String, required: false },
                }
            ],
            time_sheet: [
                {
                    _id: { type: mongoose.Schema.ObjectId, auto: true, unique: true, sparse: true },
                    start: { type: Date, required: false },
                    end: { type: Date, required: false }
                }
            ]
        },
    ],
}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Users_Model = mongoose.model('Artipro_Users', UsersSchemaModel)

module.exports = Artipro_Users_Model