import express from "express";
import multer from "multer";
import { uploadFile, getFile } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Specify the upload directory

// File upload route
router.post("/", upload.single("file"), uploadFile);

// File retrieval route
router.get("/files/:id", getFile);

export default router;
