import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';

import getSchedulesArray from '../utils/getSchedulesArray';

export interface SchedulesState {
  schedule_name: string;
  schedule_begin: string;
  schedule_end: string;
}

interface SchedulesContextData {
  schedules: SchedulesState[];
  setSchedules(data: SchedulesState[]): void;
}

const SchedulesContext = createContext<SchedulesContextData>(
  {} as SchedulesContextData,
);

const SchedulesProvider: React.FC = ({ children }) => {
  const [currentSchedules, setCurrentSchedules] = useState<SchedulesState[]>(
    [],
  );

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get<SchedulesState[]>('schedules');

      if (response.data.length) {
        setCurrentSchedules(response.data);
      } else {
        setCurrentSchedules(getSchedulesArray());
      }
    };

    if (!currentSchedules.length) {
      loadData();
    }
  }, [currentSchedules]);

  const setSchedules = useCallback((data: SchedulesState[]) => {
    setCurrentSchedules(data);
  }, []);

  return (
    <SchedulesContext.Provider
      value={{
        schedules: currentSchedules,
        setSchedules,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};

function useSchedules(): SchedulesContextData {
  const context = useContext(SchedulesContext);

  if (!context) {
    throw new Error('useSchedules must be used within an SchedulesProvider');
  }

  return context;
}

export { SchedulesProvider, useSchedules };
