import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { FiAlertOctagon, FiHelpCircle } from 'react-icons/fi';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Schedule,
  Content,
  AppointmentsContainer,
  Calendar,
  LaboratoryInfoContainer,
  HelpButton,
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Laboratories, { Laboratory } from '../../components/Laboratories';
import Appointments, { IAppointment } from '../../components/Appointments';
import Loading from '../../components/Loading';

import ModalCreateAppointment from '../../components/Modal/ModalCreateAppointment';
import ModalAppointmentInfo from '../../components/Modal/ModalAppointmentInfo';
import ModalDeleteAppointments from '../../components/Modal/ModalDeleteAppointments';
import ModalHelp from '../../components/Modal/ModalHelp';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Home: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const [selectedLaboratory, setSelectedLaboratory] = useState<Laboratory>(
    {} as Laboratory,
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>(
    {} as IAppointment,
  );

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalHelpOpen, setModalHelpOpen] = useState(false);

  const [toRefresh, setToRefresh] = useState(true);

  const [loading, setLoading] = useState(false);

  const [monthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);

        await api
          .get<IAppointment[]>('appointments/all', {
            params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            },
          })
          .then(response => {
            setAppointments(response.data);
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por agendamentos',
        });
      } finally {
        setLoading(false);
      }
    };

    if (toRefresh) {
      loadAppointments();
      setToRefresh(false);
    }
  }, [selectedDate, addToast, toRefresh]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
      setToRefresh(true);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const getDayWeek = useCallback((weekDayNumber: number) => {
    switch (weekDayNumber) {
      case 0: {
        return 'Domingo';
      }
      case 1: {
        return 'Segunda-feira';
      }
      case 2: {
        return 'Terça-feira';
      }
      case 3: {
        return 'Quarta-feira';
      }
      case 4: {
        return 'Quinta-feira';
      }
      case 5: {
        return 'Sexta-feira';
      }
      default: {
        return 'Sábado';
      }
    }
  }, []);

  function toggleModalCreate(): void {
    setModalCreateOpen(!modalCreateOpen);
  }

  function toggleModalInfo(): void {
    setModalInfoOpen(!modalInfoOpen);
  }

  function toggleModalDelete(): void {
    setModalDeleteOpen(!modalDeleteOpen);
  }

  function toggleModalHelp(): void {
    setModalHelpOpen(!modalHelpOpen);
  }

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => !monthDay.available)
      .map(availableMonthDay => {
        return new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          availableMonthDay.day - 1,
        );
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      appointment =>
        appointment.laboratory_number === selectedLaboratory.classroomNumber,
    );
  }, [appointments, selectedLaboratory]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isHome />

      <ModalAppointmentInfo
        appointment={selectedAppointment}
        isOpen={modalInfoOpen}
        setIsOpen={toggleModalInfo}
        setToRefresh={setToRefresh}
      />

      <ModalCreateAppointment
        isOpen={modalCreateOpen}
        selectedLaboratory={selectedLaboratory.classroomNumber}
        selectedDate={selectedDate}
        setIsOpen={toggleModalCreate}
        setToRefresh={setToRefresh}
      />

      <ModalDeleteAppointments
        isOpen={modalDeleteOpen}
        setIsOpen={toggleModalDelete}
        setToRefresh={setToRefresh}
      />

      <ModalHelp isOpen={modalHelpOpen} setIsOpen={toggleModalHelp}>
        <div>
          <h1>Para visualizar/excluir agendamentos:</h1>
        </div>

        <section>
          <h1>1.</h1>
          <p>Selecione um laboratório no "Mapa de laboratórios".</p>
        </section>

        <section>
          <h1>2.</h1>
          <p>Selecione um dia no "Calendário".</p>
        </section>

        <section>
          <h1>3.</h1>
          <p>
            Verifique no cabeçalho de "Agendamentos" se os dados selecionados
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
            Selecione uma data,{' '}
            {user.position === 'admin' ? 'professor, status, ' : ''}
            laboratório, tempo de aula, turma, disciplina do agendamento e
            insira observações se necessário.
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
      </ModalHelp>

      <HelpButton type="button" onClick={toggleModalHelp}>
        <FiHelpCircle />
      </HelpButton>

      <Container>
        <Laboratories
          operationContext="read"
          selectedLaboratory={selectedLaboratory}
          setSelectedLaboratory={setSelectedLaboratory}
        />

        <Content>
          <Schedule>
            <strong>Agendamentos</strong>
            <section>
              <h2>Dia {selectedDate.toLocaleDateString().substring(0, 5)}</h2>
              <h2>{getDayWeek(selectedDate.getDay())}</h2>
            </section>
            <LaboratoryInfoContainer
              color={selectedLaboratory.classroomNumber ? '#2f3342' : ''}
            >
              {selectedLaboratory.classroomNumber ? (
                <h2>
                  Laboratório: {selectedLaboratory.name}, Sala{' '}
                  {selectedLaboratory.classroomNumber}
                </h2>
              ) : (
                <>
                  <FiAlertOctagon />
                  <h2>Nenhum laboratório selecionado</h2>
                </>
              )}
            </LaboratoryInfoContainer>

            <AppointmentsContainer>
              <Appointments
                operationContext="read"
                appointments={filteredAppointments}
                setSelectedAppointment={setSelectedAppointment}
                toggleModalInfo={toggleModalInfo}
              />
            </AppointmentsContainer>
          </Schedule>

          <section>
            <strong>Calendário</strong>
            <Calendar>
              <DayPicker
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                modifiers={{
                  available: {
                    daysOfWeek: [1, 2, 3, 4, 5],
                  },
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                onMonthChange={handleMonthChange}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ]}
              />
            </Calendar>

            <Button
              type="button"
              onClick={() => {
                setModalCreateOpen(!modalCreateOpen);
              }}
            >
              + Agendar laboratório
            </Button>

            {user.position === 'admin' && (
              <Button
                type="button"
                color="#9B3B37"
                onClick={() => {
                  setModalDeleteOpen(!modalDeleteOpen);
                }}
              >
                Apagar agendamentos
              </Button>
            )}
          </section>
        </Content>
      </Container>
    </>
  );
};

export default Home;
