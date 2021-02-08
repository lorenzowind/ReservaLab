import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

import Loading from '../../components/Loading';
import Header from '../../components/Header';

import ModalHelp from '../../components/Modal/ModalHelp';

import { Container, HelpButton } from '../Home/styles';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalHelpOpen, setModalHelpOpen] = useState(false);

  function toggleModalHelp(): void {
    setModalHelpOpen(!modalHelpOpen);
  }

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isHome={false} />

      <ModalHelp isOpen={modalHelpOpen} setIsOpen={toggleModalHelp} />

      <HelpButton type="button" onClick={toggleModalHelp}>
        <FiHelpCircle />
      </HelpButton>

      <Container />
    </>
  );
};

export default Reports;
