import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";
import redis from "../config/redis.js";

const router = express.Router();

const cacheUserResumes = async (req, res, next) => {
  try {
    const key = `resumes:user:${req.user.id}`;
    const cached = await redis.get(key);

    if (cached) {
      return res.status(200).json({
        fromCache: true,
        resumes: JSON.parse(cached),
      });
    }
    next();
  } catch (err) {
    next();
  }
};

const cacheResumeById = async (req, res, next) => {
  try {
    const key = `resume:${req.params.id}`;
    const cached = await redis.get(key);

    if (cached) {
      return res.status(200).json({
        fromCache: true,
        resume: JSON.parse(cached),
      });
    }
    next();
  } catch (err) {
    next();
  }
};

const invalidateUserResumeCache = async (userId) => {
  await redis.del(`resumes:user:${userId}`);
};

const invalidateSingleResumeCache = async (userId, resumeId) => {
  await redis.del(`resume:${resumeId}`);
  await redis.del(`resumes:user:${userId}`);
};

router.post("/", protect, async (req, res, next) => {
  await invalidateUserResumeCache(req.user.id);
  next();
}, createResume);

router.get("/", protect, cacheUserResumes, async (req, res) => {
  const resumes = await getUserResumes(req, res);

  if (res.headersSent) return;

  await redis.set(
    `resumes:user:${req.user.id}`,
    JSON.stringify(resumes),
    "EX",
    300
  );

  res.json({ fromCache: false, resumes });
});

router.get("/:id", protect, cacheResumeById, async (req, res) => {
  const resume = await getResumeById(req, res);

  if (res.headersSent) return;

  await redis.set(
    `resume:${req.params.id}`,
    JSON.stringify(resume),
    "EX",
    300
  );

  res.json({ fromCache: false, resume });
});

router.put("/:id/upload-images", protect, async (req, res, next) => {
  await invalidateSingleResumeCache(req.user.id, req.params.id);
  next();
}, uploadResumeImages);

router.put("/:id", protect, async (req, res, next) => {
  await invalidateSingleResumeCache(req.user.id, req.params.id);
  next();
}, updateResume);

router.delete("/:id", protect, async (req, res, next) => {
  await invalidateSingleResumeCache(req.user.id, req.params.id);
  next();
}, deleteResume);

export default router;