export interface Log {
    /**
     * 日志内容
     */
     f1: string,
     lineId: string,
     label: string,
     timestamp: string,
     date: string,
     node: String,
     time: string,
     nodeRepeat: string,
     type: string,
     component: string,
     level: string,
     content: string,
     isError: string,

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
     f1: string,
     lineId: string,
     label: string,
     timestamp: string,
     date: string,
     node: String,
     time: string,
     nodeRepeat: string,
     type: string,
     component: string,
     level: string,
     content: string,
     isError: string,
}