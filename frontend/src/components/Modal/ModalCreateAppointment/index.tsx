import React, { useRef, useCallback, useState } from 'react';
import { FiBook, FiBookmark, FiClock, FiCpu } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';
import getTimesArray from '../../../utils/getTimesArray';
import getClassroomsArray from '../../../utils/getClassroomsArray';
import getSubjectsArray from '../../../utils/getSubjectsArray';
import getLaboratoriesArray from '../../../utils/getLaboratoriesArray';

import Modal from '..';
import Select from '../../Select';
import MultiSelect, { Option } from '../../MultiSelect';
import Button from '../../Button';
import DateInput from '../../DateInput';
import Loading from '../../Loading';

import { Form, CloseModal } from './styles';

interface ICreateAppointmentData {
  laboratory: string;
  time: string;
  year: number;
  month: number;
  day: number;
  subject: string;
  classroom: string;
}

interface IModalProps {
  isOpen: boolean;
  selectedLaboratory: number;
  selectedDate: Date;
  setIsOpen: () => void;
}

const ModalCreateAppointment: React.FC<IModalProps> = ({
  isOpen,
  selectedLaboratory,
  selectedDate,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(selectedDate);

  const [classroomsArray] = useState(getClassroomsArray());
  const [subjectsArray] = useState(getSubjectsArray());
  const [laboratoriesArray] = useState(getLaboratoriesArray());

  const [timesSelect] = useState(getTimesArray());
  const [selectedTimes, setSelectedTimes] = useState<Option[]>([]);

  const { addToast } = useToast();
  const { token, user } = useAuth();

  const handleSubmit = useCallback(
    async (data: ICreateAppointmentData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          laboratory: Yup.mixed().test(
            'match',
            'Laboratório é obrigatório',
            () => {
              return data.laboratory !== '0';
            },
          ),
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

        if (!selectedTimes.length) {
          throw new Error();
        }

        const laboratoryData = {
          laboratory_number: Number(data.laboratory),
          time: selectedTimes
            .map(selectedTime => selectedTime.value)
            .join(', '),
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
              Authorization: `Bearer ${token}`,
              user_position: user.position,
            },
          })
          .then(() => {
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
    [selectedTimes, date, token, user.position, setIsOpen, addToast],
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
              <Select
                icon={FiCpu}
                name="laboratory"
                defaultValue={selectedLaboratory}
              >
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
              <strong>Tempo(s)</strong>
              <MultiSelect
                options={timesSelect}
                icon={FiClock}
                placeholder="Selecione"
                selectedOptions={selectedTimes}
                setSelectedOptions={setSelectedTimes}
              />

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
