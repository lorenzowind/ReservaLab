import React, { useState } from 'react';

import { LaboratoriesMap, LaboratoryMap, Laboratory } from './styles';

export interface Laboratory {
  name: string;
  classroomNumber: number;
  positionNumber: number;
}

interface Props {
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
  const [selectedFloor, setSelectedFloor] = useState(1);

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

      {selectedFloor === 1 ? (
        <LaboratoryMap>
          <section>
            <Laboratory
              isSelected={
                operationContext === 'read'
                  ? selectedLaboratory.classroomNumber === 4
                  : selectedLaboratory.positionNumber === 0
              }
              onClick={() => {
                setSelectedLaboratory({
                  name: 'Info 01',
                  classroomNumber: 4,
                  positionNumber: 0,
                });

                if (toggleModalLaboratory) {
                  toggleModalLaboratory();
                }
              }}
            >
              <strong>Sala 04</strong>
              <h2>Info 01</h2>
            </Laboratory>
            <section>
              <nav>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 5
                      : selectedLaboratory.positionNumber === 1
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Info 02',
                      classroomNumber: 5,
                      positionNumber: 1,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 05</strong>
                  <h2>Info 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 6
                      : selectedLaboratory.positionNumber === 2
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Info 04',
                      classroomNumber: 6,
                      positionNumber: 2,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 06</strong>
                  <h2>Info 04</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 7
                      : selectedLaboratory.positionNumber === 3
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'EE 01',
                      classroomNumber: 7,
                      positionNumber: 3,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 07</strong>
                  <h2>EE 01</h2>
                </Laboratory>
              </nav>
              <nav>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 3
                      : selectedLaboratory.positionNumber === 8
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Info 03',
                      classroomNumber: 3,
                      positionNumber: 8,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 03</strong>
                  <h2>Info 03</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 2
                      : selectedLaboratory.positionNumber === 9
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Info 05',
                      classroomNumber: 2,
                      positionNumber: 9,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 02</strong>
                  <h2>Info 05</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 1
                      : selectedLaboratory.positionNumber === 10
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Telec',
                      classroomNumber: 1,
                      positionNumber: 10,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 01</strong>
                  <h2>Telec</h2>
                </Laboratory>
              </nav>
            </section>
          </section>
          <div>
            <nav>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 10
                    : selectedLaboratory.positionNumber === 4
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'APH 02',
                    classroomNumber: 10,
                    positionNumber: 4,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 10</strong>
                <h2>APH 02</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? false
                    : selectedLaboratory.positionNumber === 5
                }
                onClick={() => {
                  if (operationContext === 'update') {
                    setSelectedLaboratory({
                      name: '-',
                      classroomNumber: 0,
                      positionNumber: 5,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }
                }}
              >
                <strong>-</strong>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? false
                    : selectedLaboratory.positionNumber === 6
                }
                onClick={() => {
                  if (operationContext === 'update') {
                    setSelectedLaboratory({
                      name: '-',
                      classroomNumber: 0,
                      positionNumber: 6,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }
                }}
              >
                <strong>-</strong>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 8
                    : selectedLaboratory.positionNumber === 7
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'RTDTV',
                    classroomNumber: 8,
                    positionNumber: 7,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 08</strong>
                <h2>RTDTV</h2>
              </Laboratory>
            </nav>
            <nav>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 13
                    : selectedLaboratory.positionNumber === 11
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'APH 01',
                    classroomNumber: 13,
                    positionNumber: 11,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 13</strong>
                <h2>APH 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 9
                    : selectedLaboratory.positionNumber === 12
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'SMT',
                    classroomNumber: 9,
                    positionNumber: 12,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 09</strong>
                <h2>SMT</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 12
                    : selectedLaboratory.positionNumber === 13
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'Prototipagem',
                    classroomNumber: 12,
                    positionNumber: 13,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 12</strong>
                <h2>Prototipagem</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 11
                    : selectedLaboratory.positionNumber === 14
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'CLP 02',
                    classroomNumber: 11,
                    positionNumber: 14,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 11</strong>
                <h2>CLP 02</h2>
              </Laboratory>
            </nav>
          </div>
        </LaboratoryMap>
      ) : (
        <LaboratoryMap>
          <section>
            <Laboratory
              isSelected={
                operationContext === 'read'
                  ? selectedLaboratory.classroomNumber === 17
                  : selectedLaboratory.positionNumber === 15
              }
              onClick={() => {
                setSelectedLaboratory({
                  name: 'Info 06',
                  classroomNumber: 17,
                  positionNumber: 15,
                });

                if (toggleModalLaboratory) {
                  toggleModalLaboratory();
                }
              }}
            >
              <strong>Sala 17</strong>
              <h2>Info 06</h2>
            </Laboratory>
            <section>
              <nav>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 18
                      : selectedLaboratory.positionNumber === 16
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Artes',
                      classroomNumber: 18,
                      positionNumber: 16,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 18</strong>
                  <h2>Artes</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 19
                      : selectedLaboratory.positionNumber === 17
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Química 01',
                      classroomNumber: 19,
                      positionNumber: 17,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 19</strong>
                  <h2>Química 01</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 20
                      : selectedLaboratory.positionNumber === 18
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'EE 02',
                      classroomNumber: 20,
                      positionNumber: 18,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 20</strong>
                  <h2>EE 02</h2>
                </Laboratory>
              </nav>
              <nav>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 16
                      : selectedLaboratory.positionNumber === 23
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Biologia 02',
                      classroomNumber: 16,
                      positionNumber: 23,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 16</strong>
                  <h2>Biologia 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 15
                      : selectedLaboratory.positionNumber === 24
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Química 02',
                      classroomNumber: 15,
                      positionNumber: 24,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 15</strong>
                  <h2>Química 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={
                    operationContext === 'read'
                      ? selectedLaboratory.classroomNumber === 14
                      : selectedLaboratory.positionNumber === 25
                  }
                  onClick={() => {
                    setSelectedLaboratory({
                      name: 'Física 02',
                      classroomNumber: 14,
                      positionNumber: 25,
                    });

                    if (toggleModalLaboratory) {
                      toggleModalLaboratory();
                    }
                  }}
                >
                  <strong>Sala 14</strong>
                  <h2>Física 02</h2>
                </Laboratory>
              </nav>
            </section>
          </section>
          <div>
            <nav>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 24
                    : selectedLaboratory.positionNumber === 19
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'RCNC',
                    classroomNumber: 24,
                    positionNumber: 19,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 24</strong>
                <h2>RCNC</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 23
                    : selectedLaboratory.positionNumber === 20
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'ACR',
                    classroomNumber: 23,
                    positionNumber: 20,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 23</strong>
                <h2>ACR</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 22
                    : selectedLaboratory.positionNumber === 21
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'Física 01',
                    classroomNumber: 22,
                    positionNumber: 21,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 22</strong>
                <h2>Física 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 21
                    : selectedLaboratory.positionNumber === 22
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'Robótica Educacional',
                    classroomNumber: 21,
                    positionNumber: 22,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 21</strong>
                <h2>Robótica Educacional</h2>
              </Laboratory>
            </nav>
            <nav>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 28
                    : selectedLaboratory.positionNumber === 26
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'CLP 01',
                    classroomNumber: 28,
                    positionNumber: 26,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 28</strong>
                <h2>CLP 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 27
                    : selectedLaboratory.positionNumber === 27
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'Biologia 1',
                    classroomNumber: 27,
                    positionNumber: 27,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 27</strong>
                <h2>Biologia 1</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 26
                    : selectedLaboratory.positionNumber === 28
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'Projetos',
                    classroomNumber: 26,
                    positionNumber: 28,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 26</strong>
                <h2>Projetos</h2>
              </Laboratory>
              <Laboratory
                isSelected={
                  operationContext === 'read'
                    ? selectedLaboratory.classroomNumber === 25
                    : selectedLaboratory.positionNumber === 29
                }
                onClick={() => {
                  setSelectedLaboratory({
                    name: 'IME',
                    classroomNumber: 25,
                    positionNumber: 29,
                  });

                  if (toggleModalLaboratory) {
                    toggleModalLaboratory();
                  }
                }}
              >
                <strong>Sala 25</strong>
                <h2>IME</h2>
              </Laboratory>
            </nav>
          </div>
        </LaboratoryMap>
      )}
    </LaboratoriesMap>
  );
};

export default Laboratories;
