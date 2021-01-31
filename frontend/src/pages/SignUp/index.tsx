import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiBook } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import getSubjectsArray from '../../utils/getSubjectsArray';

import { useToast } from '../../hooks/toast';

import { Background, Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import MultiSelect, { Option } from '../../components/MultiSelect';
import Loading from '../../components/Loading';

import logoImg from '../../assets/logo.svg';

interface SignUpFormData {
  ra: string;
  name: string;
  email: string;
  password: string;
  position: 'teacher' | 'admin';
  subjects: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const [subjectsSelect] = useState<Option[]>(() => {
    return getSubjectsArray().map(subject => {
      return {
        label: subject,
        value: subject,
      };
    });
  });
  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>([]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          ra: Yup.string().required('RA obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
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
          password: data.password,
          subjects: selectedSubjects
            .map(selectedSubject => selectedSubject.value)
            .join(', '),
        };

        await api.post('users', userData);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no ReservaLab',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, selectedSubjects],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Container>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>Nome completo</strong>
            <Input name="name" icon={FiUser} />

            <strong>RA</strong>
            <Input name="ra" icon={FiUser} />

            <strong>Email</strong>
            <Input name="email" icon={FiMail} />

            <strong>Senha</strong>
            <Input name="password" icon={FiLock} type="password" />

            <strong>Disciplinas</strong>
            <MultiSelect
              options={subjectsSelect}
              icon={FiBook}
              placeholder="Selecione"
              selectedOptions={selectedSubjects}
              setSelectedOptions={setSelectedSubjects}
            />

            <Button type="submit">Criar</Button>

            <h2>
              Já possui conta? <Link to="/">Entre agora!</Link>
            </h2>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default SignUp;
