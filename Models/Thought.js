const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true
        // set length from 1 to 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal) 
    },
    username:{
        type: String,
        required: true
    },
    reaction: [
        // {}
    ]
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     },
    //     id: false
    // }
);

// retrieve length of thought's reactions array field on query
// ThoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });

const Thought = model('Thought', ThoughtSchema );

module.exports = Thought;