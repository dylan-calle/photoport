import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: String,
  profile_photo: String,
  email: String,
  user: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema, "users");
