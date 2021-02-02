import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiBook, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { User } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';
import getSubjectsArray from '../../../utils/getSubjectsArray';

import Modal from '..';
import Button from '../../Button';
import Loading from '../../Loading';
import Input from '../../Input';
import MultiSelect, { Option } from '../../MultiSelect';

import { Form, CloseModal } from './styles';

export type ModalTeacherOption = 'create' | 'update';

interface ITeacherData {
  ra: string;
  name: string;
  email: string;
  subjects: string;
}

interface IModalProps {
  option: ModalTeacherOption;
  teacher: User | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTeacher: React.FC<IModalProps> = ({
  option,
  teacher,
  isOpen,
  setIsOpen,
  setToRefresh,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [subjectsSelect] = useState<Option[]>(() => {
    return getSubjectsArray().map(subject => {
      return {
        label: subject,
        value: subject,
      };
    });
  });
  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>([]);

  useEffect(() => {
    if (teacher && teacher.subjects && option === 'update') {
      setSelectedSubjects(
        teacher.subjects.split(', ').map(subject => {
          return {
            label: subject,
            value: subject,
          };
        }),
      );
    } else {
      setSelectedSubjects([]);
    }
  }, [option, teacher]);

  const handleSubmit = useCallback(
    async (data: ITeacherData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          ra: Yup.string().required('RA obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!selectedSubjects.length) {
          throw new Error();
        }

        setLoading(true);

        const userData = {
          name: data.name,
          ra: data.ra,
          email: data.email,
          position: 'teacher',
          subjects: selectedSubjects
            .map(selectedSubject => selectedSubject.value)
            .join(', '),
        };

        if (option === 'create') {
          await api.post('users', userData);
        } else {
          await api.put(`users/${teacher ? teacher.id : ''}`, userData);
        }

        addToast({
          type: 'success',
          title: `Cadastro ${
            option === 'create' ? 'inserido' : 'atualizado'
          } com sucesso!`,
        });

        setIsOpen();
        setToRefresh(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: `Erro na ${
            option === 'create' ? 'inserção' : 'atualização'
          } do cadastro`,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, option, selectedSubjects, setIsOpen, setToRefresh, teacher],
  );

  const handleDeleteTeacher = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`users/${teacher ? teacher.id : ''}`).then(() => {
        addToast({
          type: 'success',
          title: 'Professor(a) excluído(a) com sucesso',
        });

        setIsOpen();
        setToRefresh(true);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir professor(a)',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, setIsOpen, setToRefresh, teacher]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <h1>
              {option === 'create' ? 'Adicionar' : 'Atualizar'} professor(a)
            </h1>
          </header>

          <section>
            <strong>Nome completo</strong>
            <Input
              name="name"
              icon={FiUser}
              defaultValue={teacher ? teacher.name : ''}
            />

            <strong>Disciplinas</strong>
            <MultiSelect
              options={subjectsSelect}
              icon={FiBook}
              placeholder="Selecione"
              selectedOptions={selectedSubjects}
              setSelectedOptions={setSelectedSubjects}
              defaultValues={selectedSubjects}
            />

            <strong>RA</strong>
            <Input
              name="ra"
              icon={FiUser}
              defaultValue={teacher ? teacher.ra : ''}
            />

            <strong>Email</strong>
            <Input
              name="email"
              icon={FiMail}
              defaultValue={teacher ? teacher.email : ''}
            />
          </section>

          {option === 'create' ? (
            <article>
              <Button type="submit">Adicionar</Button>
            </article>
          ) : (
            <div>
              <Button
                type="button"
                color="#9B3B37"
                onClick={handleDeleteTeacher}
              >
                Excluir
              </Button>

              <Button type="submit">Atualizar</Button>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalTeacher;
