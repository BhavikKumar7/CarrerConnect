import express from 'express';
import {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from "../controllers/resumeController";
import { protect } from "../middleware/authMiddleware";
import { uploadResumeImages } from "../controllers/uploadImages";

const router = express.Router();

router.post("/", protect, createResume); //Create Resume
router.get("/", protect, getUserResumes); //get resume
router.get("/:id", protect, getResumeById); //get resume by id
router.put("/:id/upload-images", protect, uploadResumeImages);
router.delete("/:id", protect, deleteResume); // delete resume
router.put("/:id", protect, updateResume); // update resume


export default router;