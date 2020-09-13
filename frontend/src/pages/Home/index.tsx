import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ptBR, { isToday, format, parseISO, isAfter } from 'date-fns';

import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';

import { Container, Schedule, Content, Calendar } from './styles';

import Header from '../../components/Header';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const SignIn: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

      <Container>
        <Content>
          <Schedule>SignIn</Schedule>

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
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
