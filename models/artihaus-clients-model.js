const mongoose = require('mongoose')

const ClientsSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    email: {
        type: String, required: false, sparse: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    contact: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true, sparse: true },
            type: { type: String, unique: false, required: false },
            number: { type: Number, required: false, unique: false, sparse: true },
            region: { type: String, required: false },
        },
    ],
}, { timestamps: true, lowercase: true, trim: true })

const Artipro_Clients = mongoose.model('Artipro_Clients', ClientsSchema)

module.exports = Artipro_Clients