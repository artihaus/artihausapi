const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    //_id
    name: { type: String, unique: true, required: true },
    email: {
        type: String, unique: true, required: true, sparse: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: { type: String, required: false },
    token: {
        _id: { type: String, require: true },
        createdAt: { type: Date, default: Date.now() }
    },
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
    user_right: { type: String }
}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Users = mongoose.model('Artipro_Users', UsersSchema)

module.exports = Artipro_Users