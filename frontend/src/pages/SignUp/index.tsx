import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiBook } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';

import { Background, Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import MultiSelect, { Option } from '../../components/MultiSelect';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [subjectsSelect, setSubjectsSelect] = useState<Option[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>([]);

  const handleSubmit = useCallback(() => {
    console.log('It works...');
  }, []);

  return (
    <Background>
      <Container>
        <h1>ReservaLab</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <strong>Nome completo</strong>
          <Input name="name" icon={FiUser} />

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
  );
};

export default SignUp;
