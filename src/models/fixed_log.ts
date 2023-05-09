import { StringLiteral } from "typescript";

export interface FixedLogs {
    logging:     Logging[];
    probability: number;
    threshold:   number;
}

export interface Logging {
    // content: string;
    // score:   number;
    // time:    number;
//new
    f1: string,
    log_name: string;
    lineId: string;
    label: string;
    timestamp: string;
    date: string;
    node: String;
    time: string;
    nodeRepeat: string;
    type: string;
    component: string;
    level: string;
    content: string;
    isError: string;
    status:string;
}