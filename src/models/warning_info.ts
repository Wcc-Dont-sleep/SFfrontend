export interface WarningInfo {
    /**
     * 异常类别
     */
    category: string;
    /**
     * 异常描述
     */
    description: string;
    /**
     * 所在实体id
     */
    entity_id: number;
    /**
     * 所在实体名字
     */
    entity_name: string;
    /**
     * 信息id
     */
    id: number;
    /**
     * 已读状态，状态取值：read unread
     */
    status: string;
    /**
     * 发生时间
     */
    time: number;
}
