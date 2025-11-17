import express from "express";
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    toggleCloseJob,
    getJobsEmployer,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import redis from "../config/redis.js";

const router = express.Router();

const cacheJobs = async (req, res, next) => {
    try {
        const cached = await redis.get("jobs:all");
        if (cached) {
            return res.status(200).json({
                fromCache: true,
                jobs: JSON.parse(cached),
            });
        }
        next();
    } catch (err) {
        next();
    }
};

const cacheEmployerJobs = async (req, res, next) => {
    try {
        const employerId = req.user.id;
        const key = `jobs:employer:${employerId}`;

        const cached = await redis.get(key);
        if (cached) {
            return res.status(200).json({
                fromCache: true,
                jobs: JSON.parse(cached),
            });
        }
        next();
    } catch (err) {
        next();
    }
};

const invalidateJobCache = async (userId = null) => {
    await redis.del("jobs:all");

    if (userId) {
        await redis.del(`jobs:employer:${userId}`);
    }
};

router.post("/", protect, async (req, res, next) => {
    await invalidateJobCache(req.user.id);
    next();
}, createJob);

router.get("/", cacheJobs, async (req, res) => {
    const jobs = await getJobs(req, res);

    if (res.headersSent) return;

    await redis.set("jobs:all", JSON.stringify(jobs), "EX", 300);
});

router.get("/get-jobs-employer", protect, cacheEmployerJobs, async (req, res) => {
    const jobs = await getJobsEmployer(req, res);

    if (res.headersSent) return;

    await redis.set(
        `jobs:employer:${req.user.id}`,
        JSON.stringify(jobs),
        "EX",
        300
    );
});

router.get("/:id", getJobById);

router.put("/:id", protect, async (req, res, next) => {
    await invalidateJobCache(req.user.id);
    next();
}, updateJob);

router.delete("/:id", protect, async (req, res, next) => {
    await invalidateJobCache(req.user.id);
    next();
}, deleteJob);

router.put("/:id/toggle-close", protect, async (req, res, next) => {
    await invalidateJobCache(req.user.id);
    next();
}, toggleCloseJob);

export default router;