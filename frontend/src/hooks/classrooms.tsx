import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';

import getClassroomsArray from '../utils/getClassroomsArray';

export interface ClassroomsState {
  classrooms: string;
}

interface ClassroomsContextData {
  classrooms: string[];
  setClassrooms(data: ClassroomsState): void;
}

const ClassroomsContext = createContext<ClassroomsContextData>(
  {} as ClassroomsContextData,
);

const ClassroomsProvider: React.FC = ({ children }) => {
  const [currentClassrooms, setCurrentClassrooms] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get<ClassroomsState>('classrooms');

      if (response.data.classrooms) {
        setCurrentClassrooms(response.data.classrooms.split(', '));
      } else {
        setCurrentClassrooms(getClassroomsArray());
      }
    };

    if (!currentClassrooms.length) {
      loadData();
    }
  }, [currentClassrooms]);

  const setClassrooms = useCallback((data: ClassroomsState) => {
    setCurrentClassrooms(data.classrooms.split(', '));
  }, []);

  return (
    <ClassroomsContext.Provider
      value={{
        classrooms: currentClassrooms,
        setClassrooms,
      }}
    >
      {children}
    </ClassroomsContext.Provider>
  );
};

function useClassrooms(): ClassroomsContextData {
  const context = useContext(ClassroomsContext);

  if (!context) {
    throw new Error('useClassrooms must be used within an ClassroomsProvider');
  }

  return context;
}

export { ClassroomsProvider, useClassrooms };
