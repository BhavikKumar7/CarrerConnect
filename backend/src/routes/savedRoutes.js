import express from "express";
import {
    saveJob,
    unsaveJob,
    getMySavedJobs,
} from "../controllers/savedController.js";
import { protect } from "../middleware/authMiddleware.js";
import redis from "../config/redis.js";

const router = express.Router();

const cacheSavedJobs = async (req, res, next) => {
    try {
        const key = `savedJobs:user:${req.user.id}`;
        const cached = await redis.get(key);

        if (cached) {
            return res.status(200).json({
                fromCache: true,
                savedJobs: JSON.parse(cached),
            });
        }

        next();
    } catch (err) {
        next();
    }
};

const invalidateSavedJobsCache = async (userId) => {
    await redis.del(`savedJobs:user:${userId}`);
};

router.post("/:jobId", protect, async (req, res, next) => {
    await invalidateSavedJobsCache(req.user.id);
    next();
}, saveJob);

router.delete("/:jobId", protect, async (req, res, next) => {
    await invalidateSavedJobsCache(req.user.id);
    next();
}, unsaveJob);

router.get("/my", protect, cacheSavedJobs, async (req, res) => {
    const savedJobs = await getMySavedJobs(req, res);

    if (res.headersSent) return;

    await redis.set(
        `savedJobs:user:${req.user.id}`,
        JSON.stringify(savedJobs),
        "EX",
        300 // 5 minutes
    );

    return res.json({
        fromCache: false,
        savedJobs,
    });
});

export default router;