const { Reaction, model, Types } = require('mongoose');
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        
        reactionBody: {
            type: String,
            required: true
            // set 280 character maximum
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal) 
        }
    },
    {  
        toJSON: {
        getters: true
        }    
    }    
);

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
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// retrieve length of thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema );

module.exports = Thought;