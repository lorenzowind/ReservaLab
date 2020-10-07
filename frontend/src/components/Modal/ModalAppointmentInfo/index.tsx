import React, { useMemo } from 'react';

import getLaboratoriesArray from '../../../utils/getLaboratoriesArray';
import getTimesArray from '../../../utils/getTimesArray';

import { IAppointment } from '../../../pages/Home';

import Modal from '..';
import Button from '../../Button';

import { Container, CloseModal } from './styles';

interface IModalProps {
  appointment: IAppointment;
  isOpen: boolean;
  setIsOpen: () => void;
}

const laboratories = getLaboratoriesArray();
const times = getTimesArray();

const ModalAppointmentInfo: React.FC<IModalProps> = ({
  appointment,
  isOpen,
  setIsOpen,
}) => {
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

  return (
    <>
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

          <Button type="button" color="#9B3B37">
            Excluir
          </Button>
        </Container>
      </Modal>
    </>
  );
};

export default ModalAppointmentInfo;
