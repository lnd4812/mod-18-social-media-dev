const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughText: {
        type: String,
        required: true
        // set length from 1 to 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now
        // use dataFormat as getter to format 
    },
    username:{
        type: String,
        required: true
    },
    reaction: [
        {}
    ]
    
});

const Thought = model('Thought', ThoughtSchema );

module.exports = Thought;