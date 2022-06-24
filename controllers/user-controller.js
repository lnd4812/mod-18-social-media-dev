const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: '-_v'
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get a user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
       .populate({
            path: 'thoughts',
            select: '-_v'
       })
        .select(`-_v`)
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user with id.  Please try again!"});
                return;
            }
            res.json(userData);
        });
    },

    // add a new user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No user with that id.  Please try again."});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(404).json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: 'No user with that id.  Please try again.'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;