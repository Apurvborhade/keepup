import cron from "node-cron";
import fetch from 'node-fetch'
import prisma from "../prisma";
import { Monitor } from "@prisma/client";

async function pingSingleMonitor(monitor: Monitor) {
    const start = Date.now();

    try {
        const res = await fetch(monitor.url, { method: "GET" });
        const latency = Date.now() - start;

        await prisma.monitorHistory.create({
            data: {
                monitorId: monitor.id,
                success: true,
                latencyMs: latency,
                statusCode: res.status
            }
        });

        await prisma.monitor.update({
            where: { id: monitor.id },
            data: { active: true }
        });

        console.log(`✅ ${monitor.url} - ${res.status} (${latency}ms)`);
    } catch (err: any) {
        const latency = Date.now() - start;

        await prisma.monitorHistory.create({
            data: {
                monitorId: monitor.id,
                success: false,
                latencyMs: latency,
                error: err.message
            }
        });

        await prisma.monitor.update({
            where: { id: monitor.id },
            data: { active: false }
        });

        console.error(`❌ ${monitor.url} - ${err.message}`);
    }
}


cron.schedule("*/5 * * * * *", async () => { // runs every 5 seconds
    const now = Date.now();
    const monitors = await prisma.monitor.findMany();

    for (const monitor of monitors) {
        // If monitor.lastPing is null, treat it as due immediately
        const lastPing = monitor.lastPing?.getTime() || 0;
        const dueTime = lastPing + monitor.intervalSec * 1000;

        if (now >= dueTime) {
            await pingSingleMonitor(monitor);
            await prisma.monitor.update({
                where: { id: monitor.id },
                data: { lastPing: new Date() }
            });
        }
    }
});