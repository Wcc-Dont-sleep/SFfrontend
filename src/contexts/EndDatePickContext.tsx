import { useState, ReactNode, createContext } from 'react';
type EndDatePickContext = {
  endDate: Date;
  setEndDate:(newdate:Date) => void;
  request: () => void;
};

export const EndDatePickContext = createContext<EndDatePickContext>(
  {} as EndDatePickContext
);
