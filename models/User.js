const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const emailValidation = function (email) {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return validEmail.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'You need to provide a username!',
      trim: true
    },
    email: {
      type: String,
      required: 'You need to provide an email address!',
      unique: true,
      validate: [emailValidation, 'You need to provide a valid email address!']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function () { return this.friends.length; });

const User = model('User', UserSchema);

module.exports = User;