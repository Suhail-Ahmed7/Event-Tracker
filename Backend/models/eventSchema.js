const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
         type: String,
          required: true
         },
    description: { 
        type: String, 
        required: true
     },
    date: { 
        type: Date,
         required: true
         },
    location: { 
        type: String,
         required: true 
        },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
     } // New field
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);