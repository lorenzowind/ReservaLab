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
  padding: 215px 0 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 1s;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 1120px;

  > strong {
    font-weight: 700;
    font-size: 42px;
    color: #bfd73e;
  }

  > h2 {
    margin: 10px 0px 20px 0px;
    font-weight: 700;
    font-size: 24px;
    color: #bfd73e;
  }

  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    form {
      display: flex;
      flex-direction: column;

      > div {
        display: flex;
        flex-direction: row;

        padding: 16px;
        border-radius: 13px;
        border: solid 0.5px #707070;
        background: #fff;
        height: 60px;
        width: 380px;

        > input {
          flex: 1;
          background: transparent;
          border: 0;
          color: #2f3342;
          font-weight: 400;
          font-size: 20px;
          margin-right: 16px;

          &::placeholder {
            color: #666360;
          }
        }

        button {
          border: 0;
          background: none;

          svg {
            color: #707070;
            width: 30px;
            height: 30px;
          }

          &:hover {
            svg {
              color: ${shade(0.2, '#707070')};
            }
          }
        }
      }
    }

    > button {
      height: 60px;
      width: 380px;
    }
  }
`;

export const TableContainer = styled.table`
  margin-top: 20px;
  height: 410px;
  width: 1120px;

  background: white;

  border-radius: 13px;
  border: solid 0.5px #707070;

  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  thead {
    border-bottom: solid 0.5px #707070;
  }

  tbody {
    margin-bottom: 10px;

    tr {
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#fff')};
      }
    }
  }

  th {
    font-size: 24px;
    padding: 20px 5px;
    max-width: 250px;
    min-width: 250px;

    &:nth-child(2) {
      max-width: 150px;
      min-width: 150px;
    }

    &:nth-child(3) {
      max-width: 300px;
      min-width: 300px;
    }

    &:nth-child(4) {
      max-width: 300px;
      min-width: 300px;
    }

    &:last-child {
      max-width: 75px;
      min-width: 75px;
    }
  }

  td {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;

    font-size: 20px;
    color: #2f3342;
    padding: 10px 5px;
    max-width: 250px;
    min-width: 250px;

    &:nth-child(2) {
      max-width: 150px;
      min-width: 150px;
    }

    &:nth-child(3) {
      max-width: 300px;
      min-width: 300px;
    }

    &:nth-child(4) {
      max-width: 300px;
      min-width: 300px;
    }

    &:last-child {
      max-width: 75px;
      min-width: 75px;

      button {
        background: none;
        border: 0;

        svg {
          color: #2f3342;
          width: 25px;
          height: 25px;
          transition: color 0.2s;

          &:hover {
            color: ${shade(0.2, '#2f3342')};
          }
        }
      }
    }
  }
`;
