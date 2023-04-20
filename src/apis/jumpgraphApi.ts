import type { WarningInfo } from "@/models/warning_info";
import { GetApi, PostApi } from 'src/utils/requests';
import { Graph } from '@/models/graph';

class jumpgraphApi {
    
    getjumpgraph: () => Promise<WarningInfo[]> = async () => {
        return [
            {
                id: 101,
                time: 1,
                entity_id: 1,
                entity_name: 'test-url1',
                category: 'type1',
                description: 'desc1',
                status: '已读'
            },
            {
                id: 102,
                time: 1,
                entity_id: 2,
                entity_name: 'test-url2',
                category: 'type2',
                description: 'desc2',
                status: '已读'
            },
            {
                id: 103,
                time: 1,
                entity_id: 3,
                entity_name: 'test-url3',
                category: 'type3',
                description: 'desc3',
                status: '已读'
            },
            {
                id: 104,
                time: 1,
                entity_id: 4,
                entity_name: 'test-url4',
                category: 'type4',
                description: 'desc4',
                status: '已读'
            },
        ]
    }

    public updateWarningInfoStatus: (id: string, newStatus: string) => void
    = async (id: string, newStatus: string) => {
        await PostApi(
            '/alarm',
            {
                id,
                status: newStatus
            }
        );
    };
}

export const myjumpgraphApi = new jumpgraphApi();