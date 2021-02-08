import React from 'react';

import { useAuth } from '../../../hooks/auth';

import Modal from '..';

import { Container, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalHelp: React.FC<IModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>

        <Container>
          <header>
            <h1>Ajuda</h1>
          </header>

          {children}
        </Container>
      </Modal>
    </>
  );
};

export default ModalHelp;
