import cron from "node-cron";
import fetch from 'node-fetch'
import prisma from "../prisma";

async function pingMonitors() {
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
            await prisma.monitor.update({
                where: {
                    id: monitor.id
                },
                data: {
                    active: true
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
            await prisma.monitor.update({
                where: {
                    id: monitor.id
                },
                data: {
                    active: false
                }

            })
            console.error(`❌ ${monitor.url} - ${err.message}`);
        }
    }
}

cron.schedule("* * * * *", pingMonitors);