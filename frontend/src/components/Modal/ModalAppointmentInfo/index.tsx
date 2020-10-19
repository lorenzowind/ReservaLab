import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';
import getLaboratoriesArray from '../../../utils/getLaboratoriesArray';
import getTimesArray from '../../../utils/getTimesArray';

import { IAppointment } from '../../../pages/Home';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';
import Select from '../../Select';

import { Container, OptionsContainer, CloseModal } from './styles';

interface IStatusData {
  status: 'scheduled' | 'presence' | 'absence' | 'non-scheduled' | '0';
}

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
  const formRef = useRef<FormHandles>(null);

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
      if (user.id === appointment.teacher.id || user.position === 'admin') {
        return true;
      }
    }

    return false;
  }, [appointment, user]);

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

  const handleSubmit = useCallback(
    async (data: IStatusData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          status: Yup.mixed().test('match', 'Status é obrigatório', () => {
            return data.status !== '0';
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const appointmentData = {
          status: data.status,
        };

        setLoading(true);

        await api
          .put(`appointments/${appointment.id}`, appointmentData)
          .then(() => {
            addToast({
              type: 'success',
              title: 'Status do agendamento alterado com sucesso',
            });

            setIsOpen();
            setToRefresh(true);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na alteração do status',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, appointment, setIsOpen, setToRefresh],
  );

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

          <OptionsContainer isCompleteFormat={user.position === 'admin'}>
            {isOwn && (
              <Button
                type="button"
                color="#9B3B37"
                onClick={handleDeleteAppointment}
              >
                Excluir
              </Button>
            )}

            {user.position === 'admin' && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Select
                  icon={FiActivity}
                  name="status"
                  defaultValue={appointment.status}
                >
                  <option value="0" disabled>
                    Selecione status
                  </option>
                  <option value="scheduled">Agendado</option>
                  <option value="presence">Presença</option>
                  <option value="absence">Ausência</option>
                  <option value="non-scheduled">Não agendado</option>
                </Select>

                <Button type="submit">Salvar</Button>
              </Form>
            )}
          </OptionsContainer>
        </Container>
      </Modal>
    </>
  );
};

export default ModalAppointmentInfo;
