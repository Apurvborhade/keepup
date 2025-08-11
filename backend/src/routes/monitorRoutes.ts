import express, { NextFunction } from 'express'
import { Request, Response } from 'express'
import prisma from '../prisma';
const router = express.Router();



// 1. Create a new monitor (name, URL, interval) - POST '/'
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, url, intervalSec } = req.body;

        // Validate input types and presence
        if (
            typeof name !== 'string' || name.trim() === '' ||
            typeof url !== 'string' || url.trim() === '' ||
            typeof intervalSec !== 'number' || !Number.isInteger(intervalSec) || intervalSec <= 0
        ) {
            return res.status(400).json({ error: "Invalid or missing 'name', 'url', or 'intervalSec'." });
        }

        // Optionally, validate URL format
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: "Invalid URL format." });
        }

        const monitor = await prisma.monitor.create({
            data: {
                name: name.trim(),
                url: url.trim(),
                userId: req.user.id,
                intervalSec,
            }
        });

        res.status(201).json(monitor);
    } catch (error) {
        next(error);
    }
});

// 2. List all monitors with their latest status. - GET /
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all monitors
        const monitors = await prisma.monitor.findMany({
            orderBy: { createdAt: 'asc' },
            include: {
                histories: {
                    orderBy: { checkedAt: 'desc' },
                    take: 1
                }
            }
        });

        // Format response: include latest status (if any) for each monitor
        const result = monitors.map(monitor => {
            const latestHistory = monitor.histories[0] || null;
            return {
                id: monitor.id,
                name: monitor.name,
                url: monitor.url,
                intervalSec: monitor.intervalSec,
                createdAt: monitor.createdAt,
                updatedAt: monitor.updatedAt,
                latestStatus: latestHistory
                    ? {
                        id: latestHistory.id,
                        statusCode: latestHistory.statusCode,
                        success: latestHistory.success,
                        latencyMs: latestHistory.latencyMs,
                        checkedAt: latestHistory.checkedAt,
                        error: latestHistory.error
                    }
                    : null
            };
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
});

// 3. Get details of a single monitor (no history). - GET /:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const monitor = await prisma.monitor.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                url: true,
                intervalSec: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!monitor) throw new AppError('Monitor not found', 404)

        res.json(monitor);
    } catch (error) {
        next(error);
    }
});

// 4. Get full ping history for that monitor. - GET /:id/history
router.get('/:id/history', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Check if monitor exists
        const monitor = await prisma.monitor.findUnique({
            where: { id },
            select: { id: true }
        });
        if (!monitor) {
            return res.status(404).json({ error: 'Monitor not found' });
        }

        const histories = await prisma.monitorHistory.findMany({
            where: { monitorId: id },
            orderBy: { checkedAt: 'desc' }
        });

        res.json(histories);
    } catch (error) {
        next(error);
    }
});

// 5. Remove a monitor (and optionally its history).DELETE /:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Check if monitor exists
        const monitor = await prisma.monitor.findUnique({
            where: { id }
        });

        if (!monitor) {
            return res.status(404).json({ error: 'Monitor not found' });
        }

        // Delete monitorHistory records first (if you want to ensure cascade)
        await prisma.monitorHistory.deleteMany({
            where: { monitorId: id }
        });

        // Delete the monitor
        await prisma.monitor.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});
