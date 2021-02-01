import React, { useState } from 'react';

import { LaboratoriesMap, LaboratoryMap, Laboratory } from './styles';

interface Props {
  selectedLaboratory: number;
  setSelectedLaboratory(laboratory: number): void;
}

const Laboratories: React.FC<Props> = ({
  selectedLaboratory,
  setSelectedLaboratory,
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
              isSelected={selectedLaboratory === 4}
              onClick={() => setSelectedLaboratory(4)}
            >
              <strong>Sala 04</strong>
              <h2>Info 01</h2>
            </Laboratory>
            <section>
              <nav>
                <Laboratory
                  isSelected={selectedLaboratory === 5}
                  onClick={() => setSelectedLaboratory(5)}
                >
                  <strong>Sala 05</strong>
                  <h2>Info 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 6}
                  onClick={() => setSelectedLaboratory(6)}
                >
                  <strong>Sala 06</strong>
                  <h2>Info 04</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 7}
                  onClick={() => setSelectedLaboratory(7)}
                >
                  <strong>Sala 07</strong>
                  <h2>EE 01</h2>
                </Laboratory>
              </nav>
              <nav>
                <Laboratory
                  isSelected={selectedLaboratory === 3}
                  onClick={() => setSelectedLaboratory(3)}
                >
                  <strong>Sala 03</strong>
                  <h2>Info 03</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 2}
                  onClick={() => setSelectedLaboratory(2)}
                >
                  <strong>Sala 02</strong>
                  <h2>Info 05</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 1}
                  onClick={() => setSelectedLaboratory(1)}
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
                isSelected={selectedLaboratory === 10}
                onClick={() => setSelectedLaboratory(10)}
              >
                <strong>Sala 10</strong>
                <h2>APH 02</h2>
              </Laboratory>
              <Laboratory
                isSelected={false}
                onClick={() => setSelectedLaboratory(selectedLaboratory)}
              >
                <strong>-</strong>
              </Laboratory>
              <Laboratory
                isSelected={false}
                onClick={() => setSelectedLaboratory(selectedLaboratory)}
              >
                <strong>-</strong>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 8}
                onClick={() => setSelectedLaboratory(8)}
              >
                <strong>Sala 08</strong>
                <h2>RTDTV</h2>
              </Laboratory>
            </nav>
            <nav>
              <Laboratory
                isSelected={selectedLaboratory === 13}
                onClick={() => setSelectedLaboratory(13)}
              >
                <strong>Sala 13</strong>
                <h2>APH 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 9}
                onClick={() => setSelectedLaboratory(9)}
              >
                <strong>Sala 09</strong>
                <h2>SMT</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 12}
                onClick={() => setSelectedLaboratory(12)}
              >
                <strong>Sala 12</strong>
                <h2>Prototipagem</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 11}
                onClick={() => setSelectedLaboratory(11)}
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
              isSelected={selectedLaboratory === 17}
              onClick={() => setSelectedLaboratory(17)}
            >
              <strong>Sala 17</strong>
              <h2>Info 06</h2>
            </Laboratory>
            <section>
              <nav>
                <Laboratory
                  isSelected={selectedLaboratory === 18}
                  onClick={() => setSelectedLaboratory(18)}
                >
                  <strong>Sala 18</strong>
                  <h2>Artes</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 19}
                  onClick={() => setSelectedLaboratory(19)}
                >
                  <strong>Sala 19</strong>
                  <h2>Química 01</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 20}
                  onClick={() => setSelectedLaboratory(20)}
                >
                  <strong>Sala 20</strong>
                  <h2>EE 02</h2>
                </Laboratory>
              </nav>
              <nav>
                <Laboratory
                  isSelected={selectedLaboratory === 16}
                  onClick={() => setSelectedLaboratory(16)}
                >
                  <strong>Sala 16</strong>
                  <h2>Biologia 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 15}
                  onClick={() => setSelectedLaboratory(15)}
                >
                  <strong>Sala 15</strong>
                  <h2>Química 02</h2>
                </Laboratory>
                <Laboratory
                  isSelected={selectedLaboratory === 14}
                  onClick={() => setSelectedLaboratory(14)}
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
                isSelected={selectedLaboratory === 24}
                onClick={() => setSelectedLaboratory(24)}
              >
                <strong>Sala 24</strong>
                <h2>RCNC</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 23}
                onClick={() => setSelectedLaboratory(23)}
              >
                <strong>Sala 23</strong>
                <h2>ACR</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 22}
                onClick={() => setSelectedLaboratory(22)}
              >
                <strong>Sala 22</strong>
                <h2>Física 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 21}
                onClick={() => setSelectedLaboratory(21)}
              >
                <strong>Sala 21</strong>
                <h2>Robótica Educacional</h2>
              </Laboratory>
            </nav>
            <nav>
              <Laboratory
                isSelected={selectedLaboratory === 28}
                onClick={() => setSelectedLaboratory(28)}
              >
                <strong>Sala 28</strong>
                <h2>CLP 01</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 27}
                onClick={() => setSelectedLaboratory(27)}
              >
                <strong>Sala 27</strong>
                <h2>Biologia 1</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 26}
                onClick={() => setSelectedLaboratory(26)}
              >
                <strong>Sala 26</strong>
                <h2>Projetos</h2>
              </Laboratory>
              <Laboratory
                isSelected={selectedLaboratory === 25}
                onClick={() => setSelectedLaboratory(25)}
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
