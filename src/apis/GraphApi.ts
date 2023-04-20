import { Graph } from '@/models/graph';
import type { LogNode } from '@/models/log';
import type { TimeSeriesNode} from '@/models/timeseries';
import { GetApi } from '@/utils/requests';

class GraphApi {
    public getGraph: (start_timestamp: number, end_timestamp: number) => Promise<Graph> = 
    async (start_timestamp: number, end_timestamp: number) => {
        const r = (await GetApi('/graph', {
            time_start: start_timestamp/1000,
            time_end: end_timestamp/1000
        })).data;
        return r as Graph;


    }

    public getNodeLog: (start_timestamp:number,end_timestamp:number,entity_id:string) => Promise<LogNode[]>
    = async (start_timestamp:number,end_timestamp:number,entity_id:string) => {

        const r=(await GetApi('/log/node', {
            time_start: start_timestamp,
            time_end: end_timestamp,
            entity_id: entity_id
        })).data;
        return r as LogNode[];
    }
    
    public getNodeTimeSeries: (start_timestamp:number,end_timestamp:number,entity_id:string) => Promise<TimeSeriesNode[]>
    = async (start_timestamp:number,end_timestamp:number,entity_id:string) => {
        const r=(await GetApi('/timeseries/node', {
            time_start: start_timestamp,
            time_end: end_timestamp,
            entity_id: entity_id
        })).data;
        return (r as TimeSeriesNode[]).slice(0,50);
    }

}

export const graphApi = new GraphApi();