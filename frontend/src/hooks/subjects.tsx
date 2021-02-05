import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import api from '../services/api';

import getSubjectsArray from '../utils/getSubjectsArray';

export interface SubjectsState {
  subjects: string;
}

interface SubjectsContextData {
  subjects: string[];
  setSubjects(data: SubjectsState): void;
}

const SubjectsContext = createContext<SubjectsContextData>(
  {} as SubjectsContextData,
);

const SubjectsProvider: React.FC = ({ children }) => {
  const [currentSubjects, setCurrentSubjects] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get<SubjectsState>('subjects');

      if (response.data.subjects) {
        setCurrentSubjects(response.data.subjects.split(', '));
      }

      setCurrentSubjects(getSubjectsArray());
    };

    if (!currentSubjects.length) {
      loadData();
    }
  }, [currentSubjects]);

  const setSubjects = useCallback((data: SubjectsState) => {
    setCurrentSubjects(data.subjects.split(', '));
  }, []);

  return (
    <SubjectsContext.Provider
      value={{
        subjects: currentSubjects,
        setSubjects,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};

function useSubjects(): SubjectsContextData {
  const context = useContext(SubjectsContext);

  if (!context) {
    throw new Error('useSubjects must be used within an SubjectsProvider');
  }

  return context;
}

export { SubjectsProvider, useSubjects };
