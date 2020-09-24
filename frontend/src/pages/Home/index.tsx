import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import api from '../../services/api';

import { useAuth, User } from '../../hooks/auth';

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
}

interface IAppointments {
  first: IAppointment[];
  second: IAppointment[];
  third: IAppointment[];
  fourth: IAppointment[];
  fifth: IAppointment[];
  sixth: IAppointment[];
  seventh: IAppointment[];
  eighth: IAppointment[];
  extra: IAppointment[];
}

const SignIn: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointments>({
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: [],
    sixth: [],
    seventh: [],
    eighth: [],
    extra: [],
  });

  const [selectedLaboratory, setSelectedLaboratory] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [modalOpen, setModalOpen] = useState(false);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { user } = useAuth();

  useEffect(() => {
    api
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
          fifth: [],
          sixth: [],
          seventh: [],
          eighth: [],
          extra: [],
        };

        // eslint-disable-next-line array-callback-return
        response.data.map(appointment => {
          const timesArray = appointment.time.split(', ');

          // eslint-disable-next-line array-callback-return
          timesArray.map(time => {
            switch (time) {
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
              default: {
                auxAppointments.extra.push(appointment);
                break;
              }
            }
          });
        });

        setAppointments(auxAppointments);
      });
  }, [selectedDate, modalOpen]);

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
        selectedLaboratory={selectedLaboratory}
        selectedDate={selectedDate}
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
              {selectedLaboratory ? (
                <>
                  <strong>(07:20 - 08:10) 1º Tempo</strong>
                  {appointments.first.length ? (
                    <>
                      {appointments.first
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(08:10 - 09:00) 2º Tempo</strong>
                  {appointments.second.length ? (
                    <>
                      {appointments.second
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(09:10 - 10:00) 3º Tempo</strong>
                  {appointments.third.length ? (
                    <>
                      {appointments.third
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(10:00 - 10:50) 4º Tempo</strong>
                  {appointments.fourth.length ? (
                    <>
                      {appointments.fourth
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(12:50 - 13:40) 5º Tempo</strong>
                  {appointments.fifth.length ? (
                    <>
                      {appointments.fifth
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(13:40 - 14:30) 6º Tempo</strong>
                  {appointments.sixth.length ? (
                    <>
                      {appointments.sixth
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(14:50 - 15:40) 7º Tempo</strong>
                  {appointments.seventh.length ? (
                    <>
                      {appointments.seventh
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>(15:40 - 16:30) 8º Tempo</strong>
                  {appointments.eighth.length ? (
                    <>
                      {appointments.eighth
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}

                  <strong>Atendimento</strong>
                  {appointments.extra.length ? (
                    <>
                      {appointments.extra
                        .filter(
                          appointment =>
                            appointment.laboratory_number ===
                            selectedLaboratory,
                        )
                        .map(filteredAppointment => (
                          <Appointment key={filteredAppointment.id}>
                            <header>
                              <h1>Laboratório: Sala {selectedLaboratory}</h1>
                            </header>

                            <div>
                              <UserAvatar>
                                {filteredAppointment.teacher.avatar_url ? (
                                  <img
                                    src={filteredAppointment.teacher.avatar_url}
                                    alt="User Avatar"
                                  />
                                ) : (
                                  <FiUser />
                                )}
                              </UserAvatar>
                              <section>
                                <article>
                                  <h1>{filteredAppointment.subject}</h1>
                                  <h1>{filteredAppointment.classroom}</h1>
                                </article>
                                <h1>{filteredAppointment.teacher.name}</h1>
                              </section>
                            </div>
                          </Appointment>
                        ))}
                    </>
                  ) : null}
                </>
              ) : (
                <strong>Nenhum laboratório foi selecionado</strong>
              )}
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
