import React from 'react';

import Modal from '..';

import { Container, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalHelp: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
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

          <div>
            <h1>Para visualizar/excluir agendamentos:</h1>
          </div>

          <section>
            <h1>1.</h1>
            <p>Selecione um laboratório no mapa.</p>
          </section>

          <section>
            <h1>2.</h1>
            <p>Selecione um dia no calendário.</p>
          </section>

          <section>
            <h1>3.</h1>
            <p>
              Verifique no cabeçalho de agendamentos se os dados selecionados
              estão corretos.
            </p>
          </section>

          <section>
            <h1>4.</h1>
            <p>Selecione um agendamento para visualizar os detalhes.</p>
          </section>

          <section>
            <h1>5.</h1>
            <p>Clique no botão "Excluir" caso deseje excluir o agendamento.</p>
          </section>

          <div>
            <h1>Para agendar um laboratório:</h1>
          </div>

          <section>
            <h1>1.</h1>
            <p>Clique no botão "+ Agendar laboratório".</p>
          </section>

          <section>
            <h1>2.</h1>
            <p>
              Selecione uma data, laboratório, tempo de aula, turma, disciplina
              do agendamento e insira observações se necessário.
            </p>
          </section>

          <section>
            <h1>3.</h1>
            <p>Clique no botão "Agendar".</p>
            <p>
              Em caso de erro, verifique se não há agendamentos existentes no
              laboratório e data selecionada. Além de que não é possível agendar
              um laboratório em fins de semana.
            </p>
          </section>
        </Container>
      </Modal>
    </>
  );
};

export default ModalHelp;
