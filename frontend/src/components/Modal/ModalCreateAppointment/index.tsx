import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiBook, FiBookmark, FiClock, FiCpu } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';
import getTimesArray from '../../../utils/getTimesArray';
import getClassroomsArray from '../../../utils/getClassroomsArray';
import getLaboratoriesArray from '../../../utils/getLaboratoriesArray';

import Modal from '..';
import Select from '../../Select';
import Button from '../../Button';
import DateInput from '../../DateInput';
import Loading from '../../Loading';

import { Form, CloseModal } from './styles';

interface ICreateAppointmentData {
  laboratory_number: string;
  time: string;
  year: number;
  month: number;
  day: number;
  subject: string;
  classroom: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalCreateAppointment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const [classroomsArray] = useState(getClassroomsArray());
  const [subjectsArray] = useState(user.subjects.split(', '));
  const [laboratoriesArray] = useState(getLaboratoriesArray());

  const [timesSelect] = useState(getTimesArray());

  const handleSubmit = useCallback(
    async (data: ICreateAppointmentData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          laboratory_number: Yup.mixed().test(
            'match',
            'Laboratório é obrigatório',
            () => {
              return data.laboratory_number !== '0';
            },
          ),
          time: Yup.mixed().test('match', 'Tempo de aula é obrigatório', () => {
            return data.subject !== '0';
          }),
          subject: Yup.mixed().test('match', 'Disciplina é obrigatória', () => {
            return data.subject !== '0';
          }),
          classroom: Yup.mixed().test('match', 'Turma é obrigatória', () => {
            return data.classroom !== '0';
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const laboratoryData = {
          laboratory_number: Number(data.laboratory_number),
          time: data.time,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          subject: data.subject,
          classroom: data.classroom,
        };

        setLoading(true);

        await api
          .post('appointments', laboratoryData, {
            headers: {
              user_position: user.position,
            },
          })
          .then(() => {
            addToast({
              type: 'success',
              title: 'Agendamento criado com sucesso',
              description: `Agendamento criado para o dia ${date.toLocaleDateString()} no laboratório ${Number(
                data.laboratory_number,
              )}.`,
            });

            setIsOpen();
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de agendamento',
          description:
            'Ocorreu um erro ao criar o agendamento, cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [date, user.position, addToast, setIsOpen],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <h1>Agendar laboratório</h1>
            <nav>
              <DateInput
                date={date}
                setDate={(value: Date) => setDate(value)}
              />
            </nav>
          </header>
          <div>
            <section>
              <strong>Laboratório</strong>
              <Select icon={FiCpu} name="laboratory_number" defaultValue="0">
                <option value="0" disabled>
                  Selecione laboratório
                </option>
                {laboratoriesArray.map(laboratory => (
                  <option key={laboratory.number} value={laboratory.number}>
                    {laboratory.name}
                  </option>
                ))}
              </Select>

              <strong>Turma</strong>
              <Select icon={FiBookmark} name="classroom" defaultValue="0">
                <option value="0" disabled>
                  Selecione turma
                </option>
                {classroomsArray.map(classroom => (
                  <option key={classroom} value={classroom}>
                    {classroom}
                  </option>
                ))}
              </Select>
            </section>
            <section>
              <strong>Tempo de aula</strong>
              <Select icon={FiClock} name="time" defaultValue="0">
                <option value="0" disabled>
                  Selecione tempo
                </option>
                {timesSelect.map(time => (
                  <option key={time.label} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </Select>

              <strong>Disciplina</strong>
              <Select icon={FiBook} name="subject" defaultValue="0">
                <option value="0" disabled>
                  Selecione disciplina
                </option>
                {subjectsArray.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </Select>
            </section>
          </div>

          <Button type="submit">Agendar</Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateAppointment;
