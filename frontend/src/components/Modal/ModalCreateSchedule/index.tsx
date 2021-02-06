import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useSchedules, SchedulesState } from '../../../hooks/schedules';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';
import Input from '../../Input';
import SwitchInput from '../../SwitchInput';

import { Form, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalCreateSchedule: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { setSchedules, schedules } = useSchedules();

  const [loading, setLoading] = useState(false);
  const [isExtraSchedule, setIsExtraSchedule] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsExtraSchedule(false);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (data: SchedulesState) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          schedule_begin: Yup.string().required('Horário inicial obrigatório'),
          schedule_end: Yup.string().required('Horário de término obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        const auxData: SchedulesState[] = schedules.reduce(
          (newSchedules: SchedulesState[], schedule: SchedulesState) => {
            newSchedules.push({
              schedule_name: schedule.schedule_name,
              schedule_begin: schedule.schedule_begin,
              schedule_end: schedule.schedule_end,
            });

            return newSchedules;
          },
          [],
        );

        auxData.push({
          schedule_name: isExtraSchedule ? '' : `${data.schedule_name}º Tempo`,
          schedule_begin: data.schedule_begin,
          schedule_end: data.schedule_end,
        });

        await api
          .post<SchedulesState[]>('schedules', {
            data: auxData,
          })
          .then(response => {
            setSchedules(response.data);

            addToast({
              type: 'success',
              title: 'Horário salvo com sucesso!',
            });
          });

        setIsOpen();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar o horário',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, isExtraSchedule, schedules, setIsOpen, setSchedules],
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
            <h1>Adicionar horário</h1>
          </header>

          <section>
            <aside>
              <strong>O tempo é extra?</strong>
              <SwitchInput
                isChecked={isExtraSchedule}
                setIsChecked={() => {
                  setIsExtraSchedule(!isExtraSchedule);
                }}
              />
            </aside>

            <strong>Tempo (Nº)</strong>
            <Input
              isDisabled={isExtraSchedule}
              name="schedule_name"
              type="number"
              placeholder="Nº Tempo"
              icon={FiInfo}
            />

            <strong>Horário inicial</strong>
            <Input name="schedule_begin" type="time" icon={FiClock} />

            <strong>Horário de término</strong>
            <Input name="schedule_end" type="time" icon={FiClock} />
          </section>

          <article>
            <Button type="submit">Adicionar</Button>
          </article>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateSchedule;
