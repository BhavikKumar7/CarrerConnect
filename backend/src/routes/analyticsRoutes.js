import express from "express";
import { getEmployerAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import redis from "../config/redis.js";

const router = express.Router();

const cacheEmployerAnalytics = async (req, res, next) => {
    try {
        const key = `analytics:employer:${req.user.id}`;

        const cached = await redis.get(key);
        if (cached) {
            return res.status(200).json({
                fromCache: true,
                analytics: JSON.parse(cached),
            });
        }

        next();
    } catch (err) {
        next();
    }
};

router.get("/overview", protect, cacheEmployerAnalytics, async (req, res) => {
    const analytics = await getEmployerAnalytics(req, res);

    if (res.headersSent) return;

    // Save in Redis: 5 minutes
    await redis.set(
        `analytics:employer:${req.user.id}`,
        JSON.stringify(analytics),
        "EX",
        300
    );

    res.status(200).json({
        fromCache: false,
        analytics,
    });
});

export default router;
