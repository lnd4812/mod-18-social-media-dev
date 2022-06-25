const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid e-mail address.  Please try again.`
       },
        required: [true, "User email address required"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      },
    ],
    friends: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     minLength: 0
    //   }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// retrieve length of user's friends array field on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;