export interface TimeSeriesValue {
    time:  number;
    score: number;
    value: number;
}

export interface TimeSeriesDisplay {
    series: TimeSeriesValue[],
    probability: string;
}

export interface TimeSeriesNode {
    time:  number;
    value: number;
}