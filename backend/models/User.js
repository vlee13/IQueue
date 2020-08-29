const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: { type: String, default: "https://st.depositphotos.com/1732591/2687/v/450/depositphotos_26877113-stock-illustration-dog-face.jpg" },
    calendly: { type: String, default: "https://calendly.com/ Click here to set your calendly!" },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    points: {
      type: Number, default: Number(process.env.POINTS)
    },
    slack: { type: String, default: "Click here to set your slack name! Then use /q command in slack." },
    description: { type: String, default: "This is my description, meow meow meow" },
    giphy: { type: String, default: "https://giphy.com/embed/LmNwrBhejkK9EFP504" },
    cohort: { type: String, default: "none" },
    admin: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
