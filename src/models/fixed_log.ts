export interface FixedLogs {
    logging:     Logging[];
    probability: number;
    threshold:   number;
}

export interface Logging {
    content: string;
    score:   number;
    time:    number;
}