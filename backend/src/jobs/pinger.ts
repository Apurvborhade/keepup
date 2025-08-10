import cron from "node-cron";
import fetch from 'node-fetch'
import prisma from "../prisma";

async function pingMonitors() {
    console.log("Monitor Pinger Job Started 🟢")
    const monitors = await prisma.monitor.findMany();

    for (const monitor of monitors) {
        const start = Date.now();

        try {
            const res = await fetch(monitor.url, { method: "GET" })
            const latency = Date.now() - start;
            await prisma.monitorHistory.create({
                data: {
                    monitorId: monitor.id,
                    success: true,
                    latencyMs: latency,
                    statusCode: res.status
                }
            })
            console.log(`✅ ${monitor.url} - ${res.status} (${latency}ms)`);
        } catch (err: any) {
            const latency = Date.now() - start;
            await prisma.monitorHistory.create({
                data: {
                    monitorId: monitor.id,
                    success: false,
                    latencyMs: latency,
                    error: err.message,
                }
            });
            console.error(`❌ ${monitor.url} - ${err.message}`);
        }
    }
}

cron.schedule("* * * * *", pingMonitors);