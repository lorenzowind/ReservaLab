import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiCpu, FiInfo } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import {
  useLaboratories,
  LaboratoriesState,
} from '../../../hooks/laboratories';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';
import Input from '../../Input';
import SwitchInput from '../../SwitchInput';
import { Laboratory } from '../../Laboratories';

import { Form, CloseModal } from './styles';

interface IUpdateLaboratory {
  classroomNumber: number;
  name: string;
}

interface IModalProps {
  laboratory: Laboratory | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalLaboratory: React.FC<IModalProps> = ({
  laboratory,
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { laboratories, setLaboratories } = useLaboratories();

  const [loading, setLoading] = useState(false);
  const [unavailableLaboratory, setUnavailableLaboratory] = useState(false);

  const [currentLaboratory, setCurrentLaboratory] = useState<Laboratory>(
    {} as Laboratory,
  );

  useEffect(() => {
    if (laboratory) {
      setCurrentLaboratory(laboratory);
      setUnavailableLaboratory(laboratory.classroomNumber === 0);
    }
  }, [laboratory]);

  const handleSubmit = useCallback(
    async (data: IUpdateLaboratory) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!unavailableLaboratory && currentLaboratory.classroomNumber === 0) {
          throw new Error();
        }

        setLoading(true);

        const laboratories_names = laboratories
          .map((auxLaboratory, index) => {
            if (index === currentLaboratory.positionNumber) {
              return data.name;
            }

            return auxLaboratory.name;
          })
          .join(', ');

        const laboratories_numbers = laboratories
          .map((auxLaboratory, index) => {
            if (index === currentLaboratory.positionNumber) {
              return data.classroomNumber;
            }

            return auxLaboratory.classroomNumber;
          })
          .join(', ');

        await api
          .post<LaboratoriesState>('laboratories', {
            laboratories_names,
            laboratories_numbers,
          })
          .then(response => {
            setLaboratories(response.data);

            addToast({
              type: 'success',
              title: 'Laboratório salvo com sucesso!',
            });
          });

        setIsOpen();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar o laboratório',
        });
      } finally {
        setLoading(false);
      }
    },
    [
      addToast,
      currentLaboratory,
      laboratories,
      setIsOpen,
      setLaboratories,
      unavailableLaboratory,
    ],
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
            <h1>Alterar laboratório</h1>
          </header>

          <section>
            <aside>
              <strong>O laboratório está indisponível?</strong>
              <SwitchInput
                isChecked={unavailableLaboratory}
                setIsChecked={() => {
                  if (!unavailableLaboratory) {
                    setCurrentLaboratory({
                      classroomNumber: 0,
                      name: currentLaboratory.name,
                      positionNumber: currentLaboratory.positionNumber,
                    });
                  }

                  setUnavailableLaboratory(!unavailableLaboratory);
                }}
              />
            </aside>

            <strong>Sala</strong>
            <Input
              isDisabled={unavailableLaboratory}
              name="classroomNumber"
              type="number"
              icon={FiInfo}
              value={currentLaboratory.classroomNumber}
              onChange={e =>
                setCurrentLaboratory({
                  classroomNumber: Number(e.target.value),
                  name: currentLaboratory.name,
                  positionNumber: currentLaboratory.positionNumber,
                })
              }
            />

            <strong>Nome</strong>
            <Input
              name="name"
              icon={FiCpu}
              defaultValue={currentLaboratory.name}
            />
          </section>

          <article>
            <Button type="submit">Salvar</Button>
          </article>
        </Form>
      </Modal>
    </>
  );
};

export default ModalLaboratory;
