export interface Graph {
    edges: Edge[];
    nodes: Node[];
}

export interface Edge {
    from_id: string;
    to_id:   string;
    value:   string;
}

export interface Node {
    /**
     * id
     */
    id: string;
    /**
     * 中文展示名
     */
    label: string;
    /**
     * 实体名字
     */
    name: string;

    namespace:string;

    pod_node:string;
    /**
     * json字符串格式的属性
     */
    property: string;
}
