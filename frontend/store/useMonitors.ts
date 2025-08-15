import AxiosInstance from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useMonitorStore } from "./useMonitorStore";

const fetchMonitors = async () => {
    try {
        const { data: monitors } = await AxiosInstance.get('/monitor');
        return monitors
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

export const useMonitors = () => {
    const setMonitors = useMonitorStore((state) => state.setMonitors);
    const query = useQuery({
        queryKey: ['monitors'],
        queryFn: fetchMonitors
    });

    React.useEffect(() => {
        if (query.data) {
            setMonitors(query.data);
        }
    }, [query.data, setMonitors]);

    return query;
}