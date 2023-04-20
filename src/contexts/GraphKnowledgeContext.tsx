import { Node } from '@/models/graph';
import { useState, ReactNode, createContext } from 'react';
interface GraphContextType{
  current_node: Node;
  logging_open:Boolean;
  metrics_open:Boolean;
  unselect: () => void;
  close_logging:()=>void;
  close_metrics:()=>void;
  open_logging:()=>void;
  open_metrics:()=>void;
};

export const GraphContext = createContext<GraphContextType>(
  {} as GraphContextType
);

