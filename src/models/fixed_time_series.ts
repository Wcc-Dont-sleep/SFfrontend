export interface FixedTimeSeries {
    probability: number;
    series:      Series[];
}

export interface Series {
    score: number;
    time:  number;
    value: number;
}