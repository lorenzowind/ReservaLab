import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import logoImg from '../../assets/logo.svg';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        setLoading(true);

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha salva com sucesso!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao salvar sua senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Container>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>Nova senha</strong>
            <Input name="password" icon={FiLock} type="password" />

            <strong>Confirmar senha</strong>
            <Input name="password_confirmation" icon={FiLock} type="password" />

            <Button type="submit">Salvar senha</Button>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default ResetPassword;
