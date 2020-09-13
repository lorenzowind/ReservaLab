import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 160px 0 60px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 1120px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Schedule = styled.div``;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #bfd73e;
    border-radius: 10px;

    font-weight: 700;
    font-size: 18px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 380px;
  }

  .DayPicker-Caption {
    color: #2f3342;
    background: #dce89b;
    padding: 18px;
    border-radius: 10px 10px 0 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0 16px 16px 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #dce89b;
    border-radius: 10px;
    color: #f8f8f8;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#dce89b')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #94969d !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #2f3342 !important;
    border-radius: 10px;
    color: #e7e6e6 !important;
  }
`;
