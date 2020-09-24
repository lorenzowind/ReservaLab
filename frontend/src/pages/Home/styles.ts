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

export const Container = styled.div`
  width: 100%;
  padding: 140px 0 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 1s;
`;

export const Content = styled.div`
  width: 1120px;
  margin-top: 20px;
  display: flex;

  button {
    margin-top: 30px;
    height: 60px;
    width: 100%;
  }
`;

export const Appointments = styled.div`
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

export const Appointment = styled.div`
  height: 130px;
  width: 90%;
  border-radius: 13px;
  background: #dce89b;

  header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #2f3342;
    border-radius: 13px 13px 0 0;
    padding: 16px;

    h1 {
      font-weight: 700;
      font-size: 20px;
      color: #bfd73e;
    }
  }

  > div {
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;

    > section {
      display: flex;
      flex-direction: column;

      article {
        display: flex;
        flex-direction: row;

        h1 {
          font-weight: 700;
          font-size: 20px;
          color: #2f3342;

          &:first-child {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 3px solid #2f3342;
          }
        }
      }

      > h1 {
        font-weight: 500;
        font-size: 20px;
        color: #2f3342;
      }
    }
  }

  & + div {
    margin-top: 20px;
  }
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 16px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #bfd73e;
  border: 0;
  transition: background-color 0.2s;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 3px solid #bfd73e;
    transition: border-color 0.2s;
  }

  svg {
    width: 40px;
    height: 40px;
    color: #fff;
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
