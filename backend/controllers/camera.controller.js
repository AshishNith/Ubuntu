import { asyncHandler } from "../middleware/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Camera } from "../models/camera.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const photoUpload = asyncHandler(async (req, res, next) => {
  const photoLocalPath = path.normalize(req.file?.path);
  if (!photoLocalPath) {
    throw new apiError(400, `photo is required ${photoLocalPath}`);
  }

  const uploadPhoto = await uploadOnCloudinary(photoLocalPath);
  if (![uploadPhoto] || !uploadPhoto.url) {
    throw new apiError(400, `photo upload failed ${photoUpload}`);
  }

  const photo = await Camera.create({
    photoUrl: uploadPhoto.url,
  });
  if (!user) {
    throw new apiError(400, `photo upload failed ${photoUpload}`);
  }

  return res
    .status(201)
    .json(new apiResponse(200, photo, "photo saved successfully"));
});

export {
  photoUpload,
};
