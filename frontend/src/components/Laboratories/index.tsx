import React, { useEffect, useState } from 'react';

import { useLaboratories } from '../../hooks/laboratories';
import LaboratoryItem from './LaboratoryItem';

import { LaboratoriesMap, LaboratoryMap } from './styles';

export interface Laboratory {
  name: string;
  classroomNumber: number;
  positionNumber: number;
}

export interface Props {
  operationContext: 'read' | 'update';
  selectedLaboratory: Laboratory;
  setSelectedLaboratory(laboratory: Laboratory): void;
  toggleModalLaboratory?: () => void;
}

const Laboratories: React.FC<Props> = ({
  operationContext,
  selectedLaboratory,
  setSelectedLaboratory,
  toggleModalLaboratory,
}) => {
  const { laboratories } = useLaboratories();

  const [selectedFloor, setSelectedFloor] = useState(1);

  const [currentLaboratories, setCurrentLaboratories] = useState(laboratories);

  useEffect(() => {
    setCurrentLaboratories(laboratories);
  }, [laboratories]);

  return (
    <LaboratoriesMap selectedFloor={selectedFloor}>
      <strong>Mapa de laboratórios</strong>

      <section>
        <button type="button" onClick={() => setSelectedFloor(1)}>
          1º Andar
        </button>

        <button type="button" onClick={() => setSelectedFloor(2)}>
          2º Andar
        </button>
      </section>

      {currentLaboratories &&
        (selectedFloor === 1 ? (
          <LaboratoryMap>
            <section>
              <LaboratoryItem
                operationContext={operationContext}
                selectedLaboratory={selectedLaboratory}
                setSelectedLaboratory={setSelectedLaboratory}
                toggleModalLaboratory={toggleModalLaboratory}
                currentLaboratories={currentLaboratories}
                laboratoryPosition={0}
              />
              <section>
                <nav>
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={1}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={2}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={3}
                  />
                </nav>
                <nav>
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={8}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={9}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={10}
                  />
                </nav>
              </section>
            </section>
            <div>
              <nav>
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={4}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={5}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={6}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={7}
                />
              </nav>
              <nav>
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={11}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={12}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={13}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={14}
                />
              </nav>
            </div>
          </LaboratoryMap>
        ) : (
          <LaboratoryMap>
            <section>
              <LaboratoryItem
                operationContext={operationContext}
                selectedLaboratory={selectedLaboratory}
                setSelectedLaboratory={setSelectedLaboratory}
                toggleModalLaboratory={toggleModalLaboratory}
                currentLaboratories={currentLaboratories}
                laboratoryPosition={15}
              />
              <section>
                <nav>
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={16}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={17}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={18}
                  />
                </nav>
                <nav>
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={23}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={24}
                  />
                  <LaboratoryItem
                    operationContext={operationContext}
                    selectedLaboratory={selectedLaboratory}
                    setSelectedLaboratory={setSelectedLaboratory}
                    toggleModalLaboratory={toggleModalLaboratory}
                    currentLaboratories={currentLaboratories}
                    laboratoryPosition={25}
                  />
                </nav>
              </section>
            </section>
            <div>
              <nav>
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={19}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={20}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={21}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={22}
                />
              </nav>
              <nav>
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={26}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={27}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={28}
                />
                <LaboratoryItem
                  operationContext={operationContext}
                  selectedLaboratory={selectedLaboratory}
                  setSelectedLaboratory={setSelectedLaboratory}
                  toggleModalLaboratory={toggleModalLaboratory}
                  currentLaboratories={currentLaboratories}
                  laboratoryPosition={29}
                />
              </nav>
            </div>
          </LaboratoryMap>
        ))}
    </LaboratoriesMap>
  );
};

export default Laboratories;
