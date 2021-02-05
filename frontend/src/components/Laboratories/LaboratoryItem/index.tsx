import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

import { Laboratory, Props } from '..';

import { LaboratoryContainer } from './styles';

interface LaboratoryItemProps extends Props {
  currentLaboratories: Laboratory[];
  laboratoryPosition: number;
}

const LaboratoryItem: React.FC<LaboratoryItemProps> = ({
  operationContext,
  selectedLaboratory,
  currentLaboratories,
  laboratoryPosition,
  setSelectedLaboratory,
  toggleModalLaboratory,
}) => {
  return (
    <LaboratoryContainer
      isSelected={
        selectedLaboratory.classroomNumber
          ? operationContext === 'read'
            ? selectedLaboratory.classroomNumber ===
              currentLaboratories[laboratoryPosition].classroomNumber
            : selectedLaboratory.positionNumber === laboratoryPosition
          : false
      }
      onClick={() => {
        if (
          operationContext === 'update' ||
          currentLaboratories[laboratoryPosition].classroomNumber
        ) {
          setSelectedLaboratory({
            name: currentLaboratories[laboratoryPosition].name,
            classroomNumber:
              currentLaboratories[laboratoryPosition].classroomNumber,
            positionNumber: laboratoryPosition,
          });
        }

        if (toggleModalLaboratory) {
          toggleModalLaboratory();
        }
      }}
    >
      {operationContext === 'update' && <FiEdit2 />}
      <strong>
        {currentLaboratories[laboratoryPosition]
          ? currentLaboratories[laboratoryPosition].classroomNumber
            ? `Sala ${currentLaboratories[laboratoryPosition].classroomNumber}`
            : '-'
          : ''}
      </strong>
      <h2>
        {currentLaboratories[laboratoryPosition]
          ? currentLaboratories[laboratoryPosition].name
          : ''}
      </h2>
    </LaboratoryContainer>
  );
};

export default LaboratoryItem;
