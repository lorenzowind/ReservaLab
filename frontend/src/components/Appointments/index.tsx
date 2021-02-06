import React, { useCallback } from 'react';
import { FiTrash } from 'react-icons/fi';

import { User } from '../../hooks/auth';
import { useSchedules } from '../../hooks/schedules';

import Button from '../Button';

import {
  Container,
  LeftColumn,
  RightColumn,
  ClassroomSection,
  NameSection,
  DetailsSection,
  InfoSection,
  TimeSection,
  HourSection,
  IntervalSection,
} from './styles';

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
  observations: string;
}

interface AppointmentsProps {
  operationContext: 'read' | 'update';
  appointments?: IAppointment[];
  setSelectedAppointment?: React.Dispatch<React.SetStateAction<IAppointment>>;
  toggleModalInfo?: () => void;
  handleRemoveSchedule?: (index: number) => void;
  toggleModalSchedule?: () => void;
}

const Appointments: React.FC<AppointmentsProps> = ({
  operationContext,
  appointments,
  setSelectedAppointment,
  toggleModalInfo,
  handleRemoveSchedule,
  toggleModalSchedule,
}) => {
  const { schedules } = useSchedules();

  const handleSelectAppointment = useCallback(
    (appointment: IAppointment | undefined) => {
      if (appointment && setSelectedAppointment && toggleModalInfo) {
        setSelectedAppointment(appointment);
        toggleModalInfo();
      }
    },
    [setSelectedAppointment, toggleModalInfo],
  );

  const getRelatedColor = useCallback(
    (status: 'scheduled' | 'presence' | 'absence' | 'non-scheduled') => {
      switch (status) {
        case 'scheduled': {
          return '#F3F300';
        }
        case 'presence': {
          return '#719F52';
        }
        case 'absence': {
          return '#BF1515';
        }
        default: {
          return '#E6AD00';
        }
      }
    },
    [],
  );

  return (
    <>
      {operationContext === 'update' && (
        <Button
          type="button"
          onClick={toggleModalSchedule}
          style={{
            alignSelf: 'flex-start',
            marginBottom: '15px',
          }}
        >
          + Adicionar horário
        </Button>
      )}

      <Container operationContext={operationContext}>
        <LeftColumn operationContext={operationContext}>
          {operationContext === 'read' && <strong>Horário</strong>}

          {schedules.map((schedule, index) => (
            <TimeSection key={schedule.schedule_begin + schedule.schedule_end}>
              <section>
                {schedule.schedule_name && (
                  <HourSection>
                    <strong>{schedule.schedule_name.split(' ')[0]}</strong>
                  </HourSection>
                )}

                <IntervalSection isExpanded={!schedule.schedule_name}>
                  <strong>
                    {`${schedule.schedule_begin} - ${schedule.schedule_end}`}
                  </strong>
                </IntervalSection>
              </section>

              {operationContext === 'update' && handleRemoveSchedule && (
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(index)}
                >
                  <FiTrash />
                </button>
              )}
            </TimeSection>
          ))}
        </LeftColumn>

        {appointments && (
          <RightColumn>
            <InfoSection>
              <strong>Professor(a)</strong>

              {schedules.map(schedule => {
                const foundAppointment = appointments.find(
                  appointment =>
                    appointment.time ===
                    schedule.schedule_begin + schedule.schedule_end,
                );

                if (foundAppointment) {
                  return (
                    <NameSection
                      key={schedule.schedule_begin + schedule.schedule_end}
                      color={getRelatedColor(foundAppointment.status)}
                      onClick={() => {
                        handleSelectAppointment(foundAppointment);
                      }}
                    >
                      <strong>{foundAppointment.teacher.name}</strong>
                    </NameSection>
                  );
                }

                return (
                  <NameSection
                    key={schedule.schedule_begin + schedule.schedule_end}
                  >
                    <strong>-</strong>
                  </NameSection>
                );
              })}
            </InfoSection>
            <DetailsSection>
              <strong>Turma</strong>

              {schedules.map(schedule => {
                const foundAppointment = appointments.find(
                  appointment =>
                    appointment.time ===
                    schedule.schedule_begin + schedule.schedule_end,
                );

                if (foundAppointment) {
                  return (
                    <ClassroomSection
                      key={schedule.schedule_begin + schedule.schedule_end}
                      color={getRelatedColor(foundAppointment.status)}
                    >
                      <strong>{foundAppointment.classroom}</strong>
                    </ClassroomSection>
                  );
                }

                return (
                  <ClassroomSection
                    key={schedule.schedule_begin + schedule.schedule_end}
                  >
                    <strong>-</strong>
                  </ClassroomSection>
                );
              })}
            </DetailsSection>
          </RightColumn>
        )}
      </Container>
    </>
  );
};

export default Appointments;
