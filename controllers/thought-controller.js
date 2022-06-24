const { Thought, User } = require('../models');

// set up functions to add and delete thought comments
const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                { $push: { thoughts: _id} },
                { new: true }
            );
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with that id.  Please try again.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },

    // delete thought 
    deleteThought({ params, }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: "That id does not match any comment.  Please try again."})
                }
            // and remove from User    
            return User.findOneAndUpdate(
                { _id: params.userId }, 
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
                );    
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: "No user with that id.  Please try again"});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;