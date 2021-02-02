import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

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
  position: relative;
  width: 750px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 0.5s;

  > button {
    width: 350px;
    height: 60px;

    & + button {
      margin-top: 20px;
    }
  }
`;

export const BackSection = styled.button`
  position: absolute;
  top: 0;
  left: 0;

  background: none;
  border: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    svg {
      color: ${shade(0.2, '#bfd73e')};
    }

    strong {
      color: ${shade(0.2, '#bfd73e')};
    }
  }

  svg {
    width: 30px;
    height: 30px;
    color: #bfd73e;
    transition: color 0.2s;
  }

  strong {
    margin-left: 5px;
    font-size: 24px;
    font-weight: 700;
    color: #2f3342;
    color: #bfd73e;
    transition: color 0.2s;
  }
`;

export const UserImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: #bfd73e;
  position: relative;
  margin-bottom: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    padding: 5px;
  }

  > svg {
    width: 200px;
    height: 200px;
    color: #fff;
  }

  label {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    position: absolute;
    background: #94969d;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#94969d')};
    }

    svg {
      width: 35px;
      height: 35px;
      color: #fff;
    }

    input {
      display: none;
    }
  }
`;

export const InputsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 28px;

  animation: ${appearWithFade} 0.5s;

  strong {
    font-size: 24px;
    font-weight: 700;
    color: #2f3342;
  }

  > div {
    margin: 12px 0;
    width: 350px;
    height: 60px;
  }

  &:first-child {
    margin-right: 20px;
  }

  &:last-child {
    margin-left: 20px;
  }
`;
