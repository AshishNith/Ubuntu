import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Camera } from "../models/camera.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const photoUpload = asyncHandler(async (req, res, next) => {
  const rawPath = req.file?.path;

  if (!rawPath) {
    throw new apiError(400, "Photo is required but not provided in request.");
  }

  const photoLocalPath = path.resolve(rawPath); // Use resolve instead of normalize for clarity

  const uploadPhoto = await uploadOnCloudinary(photoLocalPath);

  if (!uploadPhoto || !uploadPhoto.url) {
    throw new apiError(400, `Photo upload failed`);
  }

  const photo = await Camera.create({
    photoUrl: uploadPhoto.url,
  });

  if (!photo) {
    throw new apiError(500, "Failed to save photo in database");
  }

  return res
    .status(201)
    .json(new apiResponse(200, photo, "Photo saved successfully"));
});

export { photoUpload };
