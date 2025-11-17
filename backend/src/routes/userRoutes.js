import express from "express";
import {
    updateProfile,
    deleteResume,
    getPublicProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import redis from "../config/redis.js";

const router = express.Router();

const cachePublicProfile = async (req, res, next) => {
    try {
        const key = `publicProfile:${req.params.id}`;
        const cached = await redis.get(key);

        if (cached) {
            return res.status(200).json({
                fromCache: true,
                profile: JSON.parse(cached),
            });
        }

        next();
    } catch (err) {
        next();
    }
};

const invalidateUserProfileCache = async (userId) => {
    await redis.del(`publicProfile:${userId}`);
};

router.put("/profile", protect, async (req, res, next) => {
    await invalidateUserProfileCache(req.user.id);
    next();
}, updateProfile);

router.post("/resume", protect, deleteResume);

router.get("/:id", cachePublicProfile, async (req, res) => {
    const profile = await getPublicProfile(req, res);

    if (res.headersSent) return;

    await redis.set(
        `publicProfile:${req.params.id}`,
        JSON.stringify(profile),
        "EX",
        300 // 5 minutes cache
    );

    return res.json({
        fromCache: false,
        profile,
    });
});

export default router;