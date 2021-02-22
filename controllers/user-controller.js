const { User, Thought } = require('../models');

const userController = {

  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        if (err.code === 11000) {
          res.status(400).json("This username has already been used!");
        } else {
          res.status(400).json(err);
        }
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      body,
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        console.log(dbUserData);
        return Thought.deleteMany({
          _id: { $in: dbUserData.thoughts }
        })
      })
      .then(() => {
        res.json("User was deleted successfully!");
      })
      .catch(err => res.json(err));
  },

  addFriend({ params }, res) {
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;