import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, signIn],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Container>
          <h1>ReservaLab</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>E-mail</strong>
            <Input name="email" icon={FiMail} />

            <strong>Senha</strong>
            <Input name="password" icon={FiLock} type="password" />

            <Link to="forgot-password">Esqueci minha senha</Link>

            <Button type="submit">Entrar</Button>

            <h2>
              Não tem conta? <Link to="signup">Crie agora!</Link>
            </h2>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default SignIn;
