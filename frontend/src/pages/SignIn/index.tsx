import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';
import { Background, Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('It works...');
  }, []);

  return (
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
  );
};

export default SignIn;
