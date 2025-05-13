import { Router } from "express";
import { photoUpload } from "../controllers/camera.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/photoUpload").post(upload.single("photo"), photoUpload);

export default router;