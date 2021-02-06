import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';

import getLaboratoriesArray from '../utils/getLaboratoriesArray';

import { Laboratory } from '../components/Laboratories';

export interface LaboratoriesState {
  laboratories_names: string;
  laboratories_numbers: string;
}

interface LaboratoriesContextData {
  laboratories: Laboratory[];
  setLaboratories(data: LaboratoriesState): void;
}

const LaboratoriesContext = createContext<LaboratoriesContextData>(
  {} as LaboratoriesContextData,
);

const LaboratoriesProvider: React.FC = ({ children }) => {
  const [currentLaboratories, setCurrentLaboratories] = useState<Laboratory[]>(
    [],
  );

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get<LaboratoriesState>('laboratories');

      if (response.data.laboratories_names) {
        const laboratoriesNamesArray = response.data.laboratories_names.split(
          ', ',
        );
        const laboratoriesNumbersArray = response.data.laboratories_numbers.split(
          ', ',
        );

        setCurrentLaboratories(
          laboratoriesNamesArray.map((laboratoryName, index) => {
            return {
              name: laboratoryName,
              classroomNumber: Number(laboratoriesNumbersArray[index]),
              positionNumber: index,
            };
          }),
        );
      } else {
        setCurrentLaboratories(getLaboratoriesArray());
      }
    };

    if (!currentLaboratories.length) {
      loadData();
    }
  }, [currentLaboratories]);

  const setLaboratories = useCallback((data: LaboratoriesState) => {
    const laboratoriesNamesArray = data.laboratories_names.split(', ');
    const laboratoriesNumbersArray = data.laboratories_numbers.split(', ');

    setCurrentLaboratories(
      laboratoriesNamesArray.map((laboratoryName, index) => {
        return {
          name: laboratoryName,
          classroomNumber: Number(laboratoriesNumbersArray[index]),
          positionNumber: index,
        };
      }),
    );
  }, []);

  return (
    <LaboratoriesContext.Provider
      value={{
        laboratories: currentLaboratories,
        setLaboratories,
      }}
    >
      {children}
    </LaboratoriesContext.Provider>
  );
};

function useLaboratories(): LaboratoriesContextData {
  const context = useContext(LaboratoriesContext);

  if (!context) {
    throw new Error(
      'useLaboratories must be used within an LaboratoriesProvider',
    );
  }

  return context;
}

export { LaboratoriesProvider, useLaboratories };
