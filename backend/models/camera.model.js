import mongoose, { Schema } from "mongoose";

const camera = new Schema({
  photoUrl: {
    type: String,
    required: true,
  },
});

export const Camera = mongoose.model("Camera", camera);