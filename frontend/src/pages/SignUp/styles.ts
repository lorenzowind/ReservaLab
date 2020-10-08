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

export const Background = styled.div`
  min-height: 100vh;
  max-height: 100%;

  display: flex;
  align-items: stretch;

  background: #e7e6e6;
`;

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 1s;

  h1 {
    font-size: 84px;
    font-weight: 700;
    color: #bfd73e;
  }

  form {
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > strong {
      font-size: 24px;
      font-weight: 700;
      color: #2f3342;
      align-self: flex-start;
    }

    > div {
      margin: 12px 0;
      width: 550px;
      height: 60px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    a {
      align-self: flex-end;
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      color: #2f3342;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#2f3342')};
      }
    }

    button {
      margin-top: 45px;
      height: 60px;
      width: 250px;
    }

    h2 {
      margin: 12px 0;
      font-size: 18px;
      font-weight: 400;
      color: #2f3342;
    }
  }
`;
