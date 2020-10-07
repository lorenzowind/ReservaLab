import React, { useCallback } from 'react';

import { IAppointment, IFilteredAppointments } from '../../pages/Home';

import {
  Container,
  LeftColumn,
  RightColumn,
  ClassroomSection,
  NameSection,
  DetailsSection,
  InfoSection,
  LunchSection,
  TimeSection,
  HourSection,
  IntervalSection,
} from './styles';

interface AppointmentsProps {
  appointments: IFilteredAppointments;
  setSelectedAppointment: React.Dispatch<React.SetStateAction<IAppointment>>;
  toggleModalInfo: () => void;
}

const Appointments: React.FC<AppointmentsProps> = ({
  appointments,
  setSelectedAppointment,
  toggleModalInfo,
}) => {
  const handleSelectAppointment = useCallback(
    (appointment: IAppointment | undefined) => {
      if (appointment) {
        setSelectedAppointment(appointment);
        toggleModalInfo();
      }
    },
    [setSelectedAppointment, toggleModalInfo],
  );

  return (
    <Container>
      <LeftColumn>
        <strong>Horário</strong>
        <TimeSection>
          <HourSection>
            <strong>1º</strong>
          </HourSection>
          <IntervalSection>
            <strong>07:20 - 08:10</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>2º</strong>
          </HourSection>
          <IntervalSection>
            <strong>08:10 - 09:00</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <IntervalSection isExpanded>
            <strong>09:00 - 09:10</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>3º</strong>
          </HourSection>
          <IntervalSection>
            <strong>09:10 - 10:00</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>4º</strong>
          </HourSection>
          <IntervalSection>
            <strong>10:00 - 10:50</strong>
          </IntervalSection>
        </TimeSection>
        <LunchSection>
          <strong>ALMOÇO</strong>
          <div>
            <IntervalSection>
              <strong>10:00 - 10:50</strong>
            </IntervalSection>
            <IntervalSection>
              <strong>10:00 - 10:50</strong>
            </IntervalSection>
          </div>
        </LunchSection>
        <TimeSection>
          <HourSection>
            <strong>5º</strong>
          </HourSection>
          <IntervalSection>
            <strong>12:50 - 13:40</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>6º</strong>
          </HourSection>
          <IntervalSection>
            <strong>13:40 - 14:30</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <IntervalSection isExpanded>
            <strong>14:30 - 14:50</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>7º</strong>
          </HourSection>
          <IntervalSection>
            <strong>14:50 - 15:40</strong>
          </IntervalSection>
        </TimeSection>
        <TimeSection>
          <HourSection>
            <strong>8º</strong>
          </HourSection>
          <IntervalSection>
            <strong>15:40 - 16:30</strong>
          </IntervalSection>
        </TimeSection>
      </LeftColumn>
      <RightColumn>
        <InfoSection>
          <strong>Professor(a)</strong>
          <NameSection
            isOccupied={!!appointments.first}
            onClick={() => {
              handleSelectAppointment(appointments.first);
            }}
          >
            <strong>
              {appointments.first ? appointments.first.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.second}
            onClick={() => {
              handleSelectAppointment(appointments.second);
            }}
          >
            <strong>
              {appointments.second ? appointments.second.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection>
            <strong>-</strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.third}
            onClick={() => {
              handleSelectAppointment(appointments.third);
            }}
          >
            <strong>
              {appointments.third ? appointments.third.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.fourth}
            onClick={() => {
              handleSelectAppointment(appointments.fourth);
            }}
          >
            <strong>
              {appointments.fourth ? appointments.fourth.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.extra1}
            onClick={() => {
              handleSelectAppointment(appointments.extra1);
            }}
          >
            <strong>
              {appointments.extra1 ? appointments.extra1.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.extra2}
            onClick={() => {
              handleSelectAppointment(appointments.extra2);
            }}
          >
            <strong>
              {appointments.extra2 ? appointments.extra2.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.fifth}
            onClick={() => {
              handleSelectAppointment(appointments.fifth);
            }}
          >
            <strong>
              {appointments.fifth ? appointments.fifth.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.sixth}
            onClick={() => {
              handleSelectAppointment(appointments.sixth);
            }}
          >
            <strong>
              {appointments.sixth ? appointments.sixth.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection>
            <strong>-</strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.seventh}
            onClick={() => {
              handleSelectAppointment(appointments.seventh);
            }}
          >
            <strong>
              {appointments.seventh ? appointments.seventh.teacher.name : '-'}
            </strong>
          </NameSection>
          <NameSection
            isOccupied={!!appointments.eighth}
            onClick={() => {
              handleSelectAppointment(appointments.eighth);
            }}
          >
            <strong>
              {appointments.eighth ? appointments.eighth.teacher.name : '-'}
            </strong>
          </NameSection>
        </InfoSection>
        <DetailsSection>
          <strong>Turma</strong>
          <ClassroomSection>
            <strong>
              {appointments.first ? appointments.first.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.second ? appointments.second.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>-</strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.third ? appointments.third.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.fourth ? appointments.fourth.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.extra1 ? appointments.extra1.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.extra2 ? appointments.extra2.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.fifth ? appointments.fifth.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.sixth ? appointments.sixth.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>-</strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.seventh ? appointments.seventh.classroom : '-'}
            </strong>
          </ClassroomSection>
          <ClassroomSection>
            <strong>
              {appointments.eighth ? appointments.eighth.classroom : '-'}
            </strong>
          </ClassroomSection>
        </DetailsSection>
      </RightColumn>
    </Container>
  );
};

export default Appointments;
