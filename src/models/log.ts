export interface Log {
    /**
     * 日志内容
     */
    content: string;
    /**
     * 日志产生的时间
     */
    time: string;
}

export interface LogDisplay {
    /**
     * 全部日志
     */
    logging: Log[],
    /**
     * 实体异常概率
     */
    probabilty: number,
    /**
     * 标红阈值
     */
    threshold: number
}

export interface LogNode {
    /**
     * 日志内容
     */
    content: string;
    /**
     * 日志产生的时间
     */
    time: number;
}