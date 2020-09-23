import React, { useRef, useCallback, useState } from 'react';
import { FiBook, FiBookmark, FiClock, FiCpu } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form, CloseModal } from './styles';

import Modal from '../Modal';
import Select from '../Select';
import MultiSelect, { Option } from '../MultiSelect';
import Button from '../Button';
import DateInput from '../DateInput';

interface IAppointment {
  id: number;
}

interface ICreateAppointmentData {}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleCreateAppointment: (food: Omit<IAppointment, 'id'>) => void;
}

const ModalCreateAppointment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleCreateAppointment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [date, setDate] = useState(new Date());

  const [timesSelect, setTimesSelect] = useState<Option[]>([
    {
      label: 'teste',
      value: 'teste',
    },
  ]);
  const [selectedTimes, setSelectedTimes] = useState<Option[]>([]);

  const handleSubmit = useCallback(
    async (data: ICreateAppointmentData) => {
      handleCreateAppointment(data);
      setIsOpen();
    },
    [handleCreateAppointment, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CloseModal onClick={setIsOpen}>
        <strong>X</strong>
      </CloseModal>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <header>
          <h1>Agendar laboratório</h1>
          <nav>
            <DateInput date={date} setDate={(value: Date) => setDate(value)} />
          </nav>
        </header>
        <div>
          <section>
            <strong>Laboratório</strong>
            <Select icon={FiCpu} name="laboratory" />

            <strong>Tempo(s)</strong>
            <MultiSelect
              options={timesSelect}
              icon={FiClock}
              placeholder="Selecione"
              selectedOptions={selectedTimes}
              setSelectedOptions={setSelectedTimes}
            />
          </section>
          <section>
            <strong>Turma</strong>
            <Select icon={FiBookmark} name="classroom" />

            <strong>Disciplina</strong>
            <Select icon={FiBook} name="subject" />
          </section>
        </div>

        <Button type="submit">Agendar</Button>
      </Form>
    </Modal>
  );
};

export default ModalCreateAppointment;
