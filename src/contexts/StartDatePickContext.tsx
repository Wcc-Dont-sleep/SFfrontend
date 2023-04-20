import { useState, ReactNode, createContext } from 'react';
type StartDatePickContext = {
  startDate: Date;
  setStartDate:(newdate:Date) => void;
  request: () => void;
};

export const StartDatePickContext = createContext<StartDatePickContext>(
  {} as StartDatePickContext
);
