import React, { useState, useCallback, useMemo } from 'react';
import { FiUser } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

// import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Schedule,
  Content,
  Appointments,
  Appointment,
  UserAvatar,
  Calendar,
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Laboratories from '../../components/Laboratories';
import ModalCreateAppointment from '../../components/Modal/ModalCreateAppointment';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface IAppointment {
  id: number;
}

const SignIn: React.FC = () => {
  const [selectedLaboratory, setSelectedLaboratory] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [modalOpen, setModalOpen] = useState(false);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
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

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  async function handleCreateAppointment(
    appointment: Omit<IAppointment, 'id'>,
  ): Promise<void> {
    console.log('Working...');
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

  return (
    <>
      <Header isAdmin={user.position === 'admin'} />

      <ModalCreateAppointment
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleCreateAppointment={handleCreateAppointment}
      />

      <Container>
        <Laboratories
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
            <h2>
              {selectedLaboratory
                ? `Laboratório: Sala ${selectedLaboratory}`
                : 'Nenhum laboratório selecionado'}
            </h2>

            <Appointments>
              <strong>1º Tempo</strong>
              <Appointment>
                <header>
                  <h1>Laboratório: Sala {selectedLaboratory}</h1>
                </header>

                <div>
                  <UserAvatar>
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="User Avatar" />
                    ) : (
                      <FiUser />
                    )}
                  </UserAvatar>
                  <section>
                    <article>
                      <h1>Programação Web</h1>
                      <h1>3CI</h1>
                    </article>
                    <h1>Prof. Lorenzo Windmoller Martins</h1>
                  </section>
                </div>
              </Appointment>
              <Appointment>
                <header>
                  <h1>Laboratório: Sala {selectedLaboratory}</h1>
                </header>

                <div>
                  <UserAvatar>
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="User Avatar" />
                    ) : (
                      <FiUser />
                    )}
                  </UserAvatar>
                  <section>
                    <article>
                      <h1>Programação Web</h1>
                      <h1>3CI</h1>
                    </article>
                    <h1>Prof. Lorenzo Windmoller Martins</h1>
                  </section>
                </div>
              </Appointment>
              <strong>2º Tempo</strong>
              <Appointment>
                <header>
                  <h1>Laboratório: Sala {selectedLaboratory}</h1>
                </header>

                <div>
                  <UserAvatar>
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="User Avatar" />
                    ) : (
                      <FiUser />
                    )}
                  </UserAvatar>
                  <section>
                    <article>
                      <h1>Programação Web</h1>
                      <h1>3CI</h1>
                    </article>
                    <h1>Prof. Lorenzo Windmoller Martins</h1>
                  </section>
                </div>
              </Appointment>
            </Appointments>
          </Schedule>

          <section>
            <Calendar>
              <DayPicker
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                fromMonth={new Date()}
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
                setModalOpen(!modalOpen);
              }}
            >
              + Agendar laboratório
            </Button>
          </section>
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
