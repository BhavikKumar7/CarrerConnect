import express from "express";
import {
    applyToJob,
    getMyApplications,
    getApplicantsForJob,
    getApplicationById,
    updateStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import redis from "../config/redis.js";
import Application from "../models/Application.js";

const router = express.Router();

const cacheMyApplications = async (req, res, next) => {
    try {
        const key = `applications:user:${req.user.id}`;
        const cached = await redis.get(key);

        if (cached) {
            return res.status(200).json({
                fromCache: true,
                applications: JSON.parse(cached),
            });
        }
        next();
    } catch {
        next();
    }
};

const cacheJobApplicants = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const key = `applications:job:${jobId}`;

        const cached = await redis.get(key);

        if (cached) {
            return res.status(200).json({
                fromCache: true,
                applicants: JSON.parse(cached),
            });
        }
        next();
    } catch {
        next();
    }
};

const invalidateApplicationCache = async (userId, jobId) => {
    await redis.del(`applications:user:${userId}`);
    await redis.del(`applications:job:${jobId}`);
};

router.post("/:jobId", protect, async (req, res, next) => {
    await invalidateApplicationCache(req.user.id, req.params.jobId);
    next();
}, applyToJob);

router.get("/my", protect, cacheMyApplications, async (req, res) => {
    const applications = await getMyApplications(req, res);

    if (res.headersSent) return;

    await redis.set(
        `applications:user:${req.user.id}`,
        JSON.stringify(applications),
        "EX",
        300
    );

    res.json({
        fromCache: false,
        applications,
    });
});

router.get("/job/:jobId", protect, cacheJobApplicants, async (req, res) => {
    const applicants = await getApplicantsForJob(req, res);

    if (res.headersSent) return;

    await redis.set(
        `applications:job:${req.params.jobId}`,
        JSON.stringify(applicants),
        "EX",
        300
    );

    res.json({
        fromCache: false,
        applicants,
    });
});

router.get("/:id", protect, getApplicationById);

router.put("/:id/status", protect, async (req, res, next) => {
    let { jobId } = req.body;

    if (!jobId) {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        jobId =
            application.jobId ||
            application.job ||
            application.job_id ||
            application.jobID ||
            application.job_id_ref ||
            null;

        if (!jobId) {
            return res.status(400).json({
                message: "Cannot detect jobId from application document",
            });
        }
    }

    jobId = jobId.toString();

    await invalidateApplicationCache(req.user.id, jobId);
    next();
}, updateStatus);

export default router;