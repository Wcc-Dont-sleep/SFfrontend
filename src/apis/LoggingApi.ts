import type { Log } from 'src/models/log';
import type { FixedLogs } from '@/models/fixed_log';
import { GetApi } from 'src/utils/requests';

class LoggingApi {
    public getLogs: (arg0: string, arg1: string, arg2: number, arg3: number) => Promise<FixedLogs>
    = async (dataset: string, model: string, time_start: number, time_end: number) => {
        console.log(dataset, model);
        const r = (await GetApi('/logdb', {
            dataset,
            model,
            time_start,
            time_end
        })).data;
        return r as FixedLogs;
    }

    public getLogsByNode: (arg0: number, arg1: number, arg2: number) => Promise<Log[]>
    = async (time_start: number, time_end: number, entity_id: number) => {
        const r = (await GetApi('/log/node', {
            time_start,
            time_end,
            entity_id
        })).data;
        return r as Log[];
    }
}

export const loggingApi = new LoggingApi();