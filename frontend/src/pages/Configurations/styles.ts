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
  }

  > section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    margin-top: 20px;
    padding: 8px;
    width: 1120px;
    border-radius: 13px;
    border: solid 0.5px #707070;
    background: #fff;
  }

  > button {
    margin-top: 20px;
    align-self: flex-end;
    height: 60px;
    width: 380px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 8px;

  border-radius: 13px;
  border: solid 0.5px #707070;
  background: #fff;
  width: 200px;
  height: 45px;
  margin: 8px;

  strong {
    font-size: 16px;
    color: #2f3342;
  }

  button {
    border: 0;
    background: none;

    svg {
      color: #9b3b37;
      width: 20px;
      height: 20px;
    }

    &:hover {
      svg {
        color: ${shade(0.2, '#9b3b37')};
      }
    }
  }
`;
