import type { TimeSeriesDisplay, TimeSeriesValue } from "@/models/timeseries";
import { GetApi } from "@/utils/requests";

class TimeSeriesApi {
    public getTimeSeries: (arg0: string, arg1: string, arg2: number, arg3: number) => Promise<TimeSeriesDisplay>
    = async (dataset: string, model: string, time_start: number, time_end: number) => {
        console.log(dataset, model);
        const r = (await GetApi('/timeseries', {
            dataset,
            model,
            time_start,
            time_end
        })).data as TimeSeriesDisplay;
        r.series = r.series.slice(0, 50);
        return r;
    }

    public getTimeSeriesByNode: (arg0: number, arg1: number, arg2: number) => Promise<TimeSeriesValue[]>
    = async (time_start: number, time_end: number, entity_id: number) => {
        const r = (await GetApi('/timeseries/node', {
            time_start,
            time_end,
            entity_id
        })).data;
        return r as TimeSeriesValue[];
    }
}

export const timeSeriesApi = new TimeSeriesApi();