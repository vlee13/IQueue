const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: { type: String, default: "https://st.depositphotos.com/1732591/2687/v/450/depositphotos_26877113-stock-illustration-dog-face.jpg"},
    calendly: { type: String, default: "https://calendly.com/ Click here to set your calendly!"},
    posts: [{ type : Schema.Types.ObjectId, ref: 'Posts' }],
    points: {
      type: Number, default: 25000
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
