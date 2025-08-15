import { Monitor } from '@/components/monitor-list'
import { create } from 'zustand'

type MonitorStore = {
    monitors: Monitor[];
    setMonitors: (monitors: Monitor[]) => void;
}

export const useMonitorStore = create<MonitorStore>((set) => ({
    monitors: [],
    setMonitors: (monitors) => set({ monitors })
}))