import React, { useCallback, useState } from 'react';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';
import SwitchInput from '../../SwitchInput';

import { Container, OptionsContainer, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDeleteAppointments: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  setToRefresh,
}) => {
  const [onlyOld, setOnlyOld] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleDeleteAppointments = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .delete(`appointments/clean/${onlyOld ? 'old' : 'all'}`)
        .then(() => {
          addToast({
            type: 'success',
            title: `Agendamentos ${
              onlyOld ? 'antigos ' : ''
            }excluídos com sucesso`,
          });

          setIsOpen();
          setOnlyOld(false);
          setToRefresh(true);
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir agendamentos',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, onlyOld, setIsOpen, setToRefresh]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>
        <Container>
          <header>
            <h1>
              Deseja <b>apagar</b> todos os agendamentos?
            </h1>
          </header>
          <div>
            <strong>Apenas agendamentos antigos</strong>
            <SwitchInput isChecked={onlyOld} setIsChecked={setOnlyOld} />
          </div>

          <OptionsContainer>
            <Button
              type="button"
              color="#9B3B37"
              onClick={handleDeleteAppointments}
            >
              Apagar
            </Button>
          </OptionsContainer>
        </Container>
      </Modal>
    </>
  );
};

export default ModalDeleteAppointments;
