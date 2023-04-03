export interface TimeSeriesValue {
    time:  number;
    score: number
    value: number;
}

export interface TimeSeriesDisplay {
    series: TimeSeriesValue[],
    probability: number
}

export interface TimeSeriesNode {
    time:  number;
    value: number;
}