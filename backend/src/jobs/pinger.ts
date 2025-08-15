import cron from "node-cron";
import fetch from 'node-fetch'
import { Monitor, PrismaClient } from "@prisma/client";


async function pingSingleMonitor(prisma: PrismaClient, monitor: Monitor) {
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

let isRunning = false;
cron.schedule("*/5 * * * * *", async () => { // runs every 5 seconds
    if (isRunning) {
        console.log("⏳ Previous run still in progress, skipping this tick...");
        return;
    }


    isRunning = true; // start the job
    const prisma = new PrismaClient();
    try {
        const now = Date.now();
        const monitors = await prisma.monitor.findMany();
        for (const monitor of monitors) {
            const dueMonitors = monitors.filter((m: Monitor) => {
                const lastPing = m.lastPing?.getTime() || 0;
                const dueTime = lastPing + m.intervalSec * 1000;
                return now >= dueTime;
            })
            if (dueMonitors.length === 0) {
                console.log("📭 No monitors due for ping.");
                return;
            }

            console.log(`🚀 Pinging ${dueMonitors.length} monitor(s)...`);
            // Ping all in parallel
            await Promise.allSettled(
                dueMonitors.map(async (monitor: Monitor) => {
                    pingSingleMonitor(prisma, monitor)
                    await prisma.monitor.update({
                        where: { id: monitor.id },
                        data: { lastPing: new Date() }
                    });
                })
            );
            // If monitor.lastPing is null, treat it as due immediately
            const lastPing = monitor.lastPing?.getTime() || 0;
            const dueTime = lastPing + monitor.intervalSec * 1000;
            console.log(new Date(now).toLocaleTimeString(), new Date(dueTime).toLocaleTimeString())

        }
    } catch (error) {
        console.error("Cron job error:", error);
    } finally {
        isRunning = false; // finish the job
    }

});