import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearWithFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface LaboratoryInfoContainerProps {
  color?: string;
}

export const Container = styled.div`
  width: 100%;
  padding: 215px 0 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 1s;
`;

export const HelpButton = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin-bottom: 30px;
  margin-right: 60px;
  width: 60px;
  height: 60px;
  border: 0;
  background: #2f3342;
  border-radius: 50%;
  transition: background-color 0.2s;

  animation: ${appearWithFade} 1s;

  svg {
    width: 60px;
    height: 60px;
    color: #f8f8f8;
    transition: color 0.2s;
  }

  &:hover {
    color: ${shade(0.2, '#2f3342')};

    svg {
      color: ${shade(0.2, '#f8f8f8')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  width: 1120px;
  margin-top: 20px;

  > section {
    display: flex;
    flex-direction: column;

    &:nth-child(2) {
      > strong {
        font-weight: 700;
        font-size: 42px;
        color: #bfd73e;
      }
    }

    button {
      margin-top: 30px;
      height: 60px;
      width: 380px;
    }
  }
`;

export const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10px;

  > strong {
    font-weight: 700;
    font-size: 24px;
    color: #bfd73e;
    margin: 20px 0;
  }
`;

export const Schedule = styled.div`
  flex: 1;

  > strong {
    font-weight: 700;
    font-size: 42px;
    color: #bfd73e;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    color: #2f3342;
  }

  > section {
    display: flex;
    flex-direction: row;

    h2 {
      margin-top: 10px;

      &:first-child {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 3px solid #2f3342;
      }
    }
  }
`;

export const LaboratoryInfoContainer = styled.div<LaboratoryInfoContainerProps>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 40px;

  svg {
    height: 40px;
    width: 40px;
    margin-right: 20px;
    color: #9b3b37;
  }

  h2 {
    color: ${props => (props.color ? props.color : '#9b3b37')};
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  margin-top: 10px;

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
