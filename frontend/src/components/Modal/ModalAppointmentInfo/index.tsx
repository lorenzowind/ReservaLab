import React, { useCallback, useMemo, useState } from 'react';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import getLaboratoriesArray from '../../../utils/getLaboratoriesArray';
import getTimesArray from '../../../utils/getTimesArray';

import { IAppointment } from '../../../pages/Home';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';

import { Container, CloseModal } from './styles';

interface IModalProps {
  appointment: IAppointment;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const laboratories = getLaboratoriesArray();
const times = getTimesArray();

const ModalAppointmentInfo: React.FC<IModalProps> = ({
  appointment,
  isOpen,
  setIsOpen,
  setToRefresh,
}) => {
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { user } = useAuth();

  const laboratory = useMemo(() => {
    return laboratories.find(
      findLaboratory => findLaboratory.number === appointment.laboratory_number,
    );
  }, [appointment]);

  const time = useMemo(() => {
    return times.find(findTime => findTime.value === appointment.time);
  }, [appointment]);

  const date = useMemo(() => {
    return new Date(
      appointment.year,
      appointment.month - 1,
      appointment.day,
    ).toLocaleDateString();
  }, [appointment]);

  const isOwn = useMemo(() => {
    if (appointment.teacher) {
      if (user.id === appointment.teacher.id) {
        return true;
      }
    }

    return false;
  }, [appointment, user.id]);

  const handleDeleteAppointment = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`appointments/${appointment.id}`).then(() => {
        addToast({
          type: 'success',
          title: 'Agendamento excluído com sucesso',
        });

        setIsOpen();
        setToRefresh(true);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir agendamento',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, appointment, setIsOpen, setToRefresh]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>
        <Container>
          <header>
            <h1>Detalhes do agendamento</h1>
          </header>
          <div>
            <section>
              <h1>
                Professor(a):
                <strong>
                  {appointment.teacher ? ` ${appointment.teacher.name}` : ''}
                </strong>
              </h1>
              <h1>
                Tempo de aula:
                <strong>{time ? ` ${time.label}` : ''}</strong>
              </h1>
              <h1>
                Laboratório:
                <strong>
                  {laboratory
                    ? ` ${laboratory.name} (Sala ${laboratory.number})`
                    : ''}
                </strong>
              </h1>
            </section>
            <section>
              <h1>
                Disciplina:
                <strong>
                  {appointment.subject ? ` ${appointment.subject}` : ''}
                </strong>
              </h1>
              <h1>
                Turma:
                <strong>
                  {appointment.classroom ? ` ${appointment.classroom}` : ''}
                </strong>
              </h1>
              <h1>
                Data:
                <strong>{date ? ` ${date}` : ''}</strong>
              </h1>
            </section>
          </div>

          {isOwn && (
            <Button
              type="button"
              color="#9B3B37"
              onClick={handleDeleteAppointment}
            >
              Excluir
            </Button>
          )}
        </Container>
      </Modal>
    </>
  );
};

export default ModalAppointmentInfo;
