import styled, { keyframes } from 'styled-components';
import { transparentize, shade } from 'polished';

const appearFromTop = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
  width: 100%;
  height: 100px;
  position: absolute;
  background: #f8f8f8;
  border: solid 0.5px #707070;

  animation: ${appearFromTop} 1s;

  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #bfd73e;
    margin: 0 60px;
  }

  section {
    border-left: 3px solid #bfd73e;
    padding-left: 60px;

    strong {
      font-size: 24px;
      font-weight: 500;
      color: ${transparentize(0.5, '#bfd73e')};
    }

    h2 {
      font-size: 24px;
      font-weight: 500;
    }
  }

  > div {
    &:first-child {
      display: flex;
      align-items: center;
    }

    &:last-child {
      display: flex;
      align-items: center;

      button {
        &:first-child {
          border: 0;
          font-size: 32px;
          font-weight: 700;
          color: #9b3b37;
          background: transparent;
          margin-right: 60px;
          transition: color 0.2s;

          &:hover {
            color: ${shade(0.2, '#9b3b37')};
          }
        }
      }
    }
  }
`;

export const UserAvatar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 60px;
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

    &:hover {
      border-color: ${shade(0.2, '#bfd73e')};
    }
  }

  svg {
    width: 40px;
    height: 40px;
    color: #fff;
  }

  &:hover {
    background: ${shade(0.2, '#bfd73e')};
  }
`;
