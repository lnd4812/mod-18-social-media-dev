const { Thought, User } = require('../models');

// set up functions to get, add, update and delete thought comments
const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
          .then(thoughtData => res.json(thoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          })
    },
    
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
           .then(thoughtData => res.json(thoughtData))
           .catch(err => {
              console.log(err);
              res.sendStatus(400);
            });
    },
        
    addThought({ params, body }, res) {
      Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                { $push: { thoughts: _id, body } },
                { new: true })
            })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No match to that user id.  Please try again."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body,
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No match to that Thought id.  Please try again."});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, {new: true, runValidators: true})
            .then(thoughtData => {
                res.json(thoughtData)
            })
            then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
                )       
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No match to that user id.  Please try again."});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
        },

    // delete thought 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: "No match to that id.  Please try again."})
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
                    res.status(404).json({ message: "No user match to that id.  Please try again."});
                    return;
                }
                res.json({userData, message: "Thought and any associated Reactions successfully deleted"});
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOne(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}}
        )
        .then(userData => {
            console.log(userData)
           return res.json(userData)
         })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;