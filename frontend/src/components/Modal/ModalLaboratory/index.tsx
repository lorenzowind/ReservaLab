import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FiCpu } from 'react-icons/fi';
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
import { Laboratory } from '../../Laboratories';

import { Form, CloseModal } from './styles';

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {}, []);

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
            <strong>Nome</strong>
            <Input
              name="name"
              icon={FiCpu}
              defaultValue={laboratory ? laboratory.name : ''}
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
