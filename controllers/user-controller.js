const { User } = require("../models");

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        path: "friends",
        select: "-_v",
      })
      .select("-_v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        path: "friends",
        select: "-_v",
      })
      .select("-_v")
      .then(userData => {
        if (!userData) {
          res
            .status(404)
            .json({ message: "No match to that user id.  Please try again." });
          return;
        }
        res.json(userData);
      });
  },

  // add a new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // add a new friend to user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: body } },
      { new: true }
      )
      .select("-_v")
      .then(userData => {
        if (!userData) {
          res
            .status(404)
            .json({ message: "No match to that user id.  Please try again." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // update a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(userData => {
        if (!userData) {
          res
            .status(404)
            .json({ message: "No match to that user id.  Please try again." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(404).json(err));
  },

  // delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id })
    .then((userData) => {
      if (!userData) {res.status(400).json({ message: "No match to that user id.  Please try again." });
          return;
        }
        // delete any associated thoughts ???
        res.json({ message: "User successfully deleted."});
      })
      .catch((err) => res.status(400).json(err));
  },

// delete thoughts associated with User, then delete User?

//  deleteUser({ params }, res) {
//    User.findOneAndUpdate(
//     { _id: params.id })
//    .then(userData => {
//    if (!userData) {
//       {res.status(400).json({ message: "No match to that user id.  Please try again." });
//       return;
//       } if (thoughtData) {
//           Thought.findAndDeleteMany(
//              { _id: params.userId }, 
//              { $pullAll: { thoughts: params.thoughtId }},
//              { new: true }
//              return; });
//        }    
//          .then(userData => {
//           return User.findOneAndDelete(
//           { _id: params.id })
//       .then(userData => {
//       res.json({ message: "User successfully deleted."});
//       })
//       .catch((err) => res.status(400).json(err));
//       },


  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;