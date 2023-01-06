import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { dateFormat } from '@Lib/utilities';

export type MainContextType = {
  scheduleDate: string;
  setScheduleDate: Dispatch<SetStateAction<any>>;
  sportName: string;
  setSportName: Dispatch<SetStateAction<any>>;
  matchSort: string;
  setMatchSort: Dispatch<SetStateAction<any>>;
  isSubscribe: boolean;
  setIsSubscribe: Dispatch<SetStateAction<any>>;
};

export const MainContext = createContext<MainContextType | null>(null);

export const MainProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [scheduleDate, setScheduleDate] = useState(dateFormat(Date.now()));
  const [sportName, setSportName] = useState('all');
  const [matchSort, setMatchSort] = useState('best');
  const [isSubscribe, setIsSubscribe] = useState(false);

  return (
    <MainContext.Provider
      value={{
        scheduleDate,
        setScheduleDate,
        sportName,
        setSportName,
        matchSort,
        setMatchSort,
        isSubscribe,
        setIsSubscribe
      }}>
      {children}
    </MainContext.Provider>
  );
};
