import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { FiAlertOctagon } from 'react-icons/fi';
import api from '../../services/api';

import { useAuth, User } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Schedule,
  Content,
  AppointmentsContainer,
  Calendar,
  LaboratoryInfoContainer,
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Laboratories from '../../components/Laboratories';
import Appointments from '../../components/Appointments';
import Loading from '../../components/Loading';

import ModalCreateAppointment from '../../components/Modal/ModalCreateAppointment';
import ModalAppointmentInfo from '../../components/Modal/ModalAppointmentInfo';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

export interface IAppointment {
  id: string;
  teacher_id: string;
  teacher: User;
  laboratory_number: number;
  time: string;
  year: number;
  month: number;
  day: number;
  subject: string;
  classroom: string;
  status: 'scheduled' | 'presence' | 'absence' | 'non-scheduled';
}

export interface IFilteredAppointments {
  first: IAppointment | undefined;
  second: IAppointment | undefined;
  third: IAppointment | undefined;
  fourth: IAppointment | undefined;
  extra1: IAppointment | undefined;
  extra2: IAppointment | undefined;
  fifth: IAppointment | undefined;
  sixth: IAppointment | undefined;
  seventh: IAppointment | undefined;
  eighth: IAppointment | undefined;
}

interface IAppointments {
  first: IAppointment[];
  second: IAppointment[];
  third: IAppointment[];
  fourth: IAppointment[];
  extra1: IAppointment[];
  extra2: IAppointment[];
  fifth: IAppointment[];
  sixth: IAppointment[];
  seventh: IAppointment[];
  eighth: IAppointment[];
}

const SignIn: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointments>({
    first: [],
    second: [],
    third: [],
    fourth: [],
    extra1: [],
    extra2: [],
    fifth: [],
    sixth: [],
    seventh: [],
    eighth: [],
  });

  const [selectedLaboratory, setSelectedLaboratory] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>(
    {} as IAppointment,
  );

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);

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
            const auxAppointments: IAppointments = {
              first: [],
              second: [],
              third: [],
              fourth: [],
              extra1: [],
              extra2: [],
              fifth: [],
              sixth: [],
              seventh: [],
              eighth: [],
            };

            // eslint-disable-next-line array-callback-return
            response.data.map(appointment => {
              switch (appointment.time) {
                case '1': {
                  auxAppointments.first.push(appointment);
                  break;
                }
                case '2': {
                  auxAppointments.second.push(appointment);
                  break;
                }
                case '3': {
                  auxAppointments.third.push(appointment);
                  break;
                }
                case '4': {
                  auxAppointments.fourth.push(appointment);
                  break;
                }
                case '5': {
                  auxAppointments.fifth.push(appointment);
                  break;
                }
                case '6': {
                  auxAppointments.sixth.push(appointment);
                  break;
                }
                case '7': {
                  auxAppointments.seventh.push(appointment);
                  break;
                }
                case '8': {
                  auxAppointments.eighth.push(appointment);
                  break;
                }
                case 'extra1': {
                  auxAppointments.extra1.push(appointment);
                  break;
                }
                default: {
                  auxAppointments.extra2.push(appointment);
                  break;
                }
              }
            });

            setAppointments(auxAppointments);
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
    const auxFilteredAppointments: IFilteredAppointments = {} as IFilteredAppointments;

    auxFilteredAppointments.first = appointments.first.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.second = appointments.second.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.third = appointments.third.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.fourth = appointments.fourth.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.extra1 = appointments.extra1.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.extra2 = appointments.extra2.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.fifth = appointments.fifth.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.sixth = appointments.sixth.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.seventh = appointments.seventh.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    auxFilteredAppointments.eighth = appointments.eighth.find(
      appointment => appointment.laboratory_number === selectedLaboratory,
    );

    return auxFilteredAppointments;
  }, [appointments, selectedLaboratory]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isAdmin={user.position === 'admin'} isHome />

      <ModalAppointmentInfo
        appointment={selectedAppointment}
        isOpen={modalInfoOpen}
        setIsOpen={toggleModalInfo}
        setToRefresh={setToRefresh}
      />

      <ModalCreateAppointment
        isOpen={modalCreateOpen}
        setIsOpen={toggleModalCreate}
        setToRefresh={setToRefresh}
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
            <LaboratoryInfoContainer
              color={selectedLaboratory ? '#2f3342' : ''}
            >
              {selectedLaboratory ? (
                <h2>Laboratório: Sala {selectedLaboratory}</h2>
              ) : (
                <>
                  <FiAlertOctagon />
                  <h2>Nenhum laboratório selecionado</h2>
                </>
              )}
            </LaboratoryInfoContainer>

            <AppointmentsContainer>
              <Appointments
                appointments={filteredAppointments}
                setSelectedAppointment={setSelectedAppointment}
                toggleModalInfo={toggleModalInfo}
              />
            </AppointmentsContainer>
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
                setModalCreateOpen(!modalCreateOpen);
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
