import React, { useState } from 'react';
import { FiHelpCircle, FiChevronRight, FiAlertOctagon } from 'react-icons/fi';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Button from '../../components/Button';

import ModalHelp from '../../components/Modal/ModalHelp';

import {
  Container,
  HelpButton,
  Content,
  CasesContainer,
  CaseItem,
  EmptyContainer,
  ChatContainer,
} from './styles';

const Support: React.FC = () => {
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

      <Container>
        {/* <Content>
          <strong>Suporte</strong>

          <div>
            <CasesContainer>
              <CaseItem>
                <h4>NÃO RESOLVIDO</h4>

                <section>
                  <h3>Laboratorio 01</h3>
                  <strong>Programa X nao inicia corretamente</strong>
                  <h2>07/02/2021</h2>
                </section>

                <FiChevronRight />
              </CaseItem>
              <EmptyContainer>
                <FiAlertOctagon />

                <h2>Sem casos</h2>
              </EmptyContainer>
            </CasesContainer>

            <section>
              <Button type="button">+ Criar caso</Button>

              <ChatContainer>
                <EmptyContainer>
                  <FiAlertOctagon />

                  <h2>Nenhum caso selecionado</h2>
                </EmptyContainer>
              </ChatContainer>
            </section>
          </div>
        </Content> */}
      </Container>
    </>
  );
};

export default Support;
