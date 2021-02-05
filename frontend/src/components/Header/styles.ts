import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromTop = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateX(0);
  }
`;

interface HeaderProps {
  isHome: boolean;
}

interface PageButtonProps {
  isSelected: boolean;
}

export const Container = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100px;
  position: absolute;
  background: #f8f8f8;

  ${props =>
    props.isHome &&
    css`
      animation: ${appearFromTop} 1s;
    `}

  img {
    width: 160px;
    margin: 0 60px;
  }

  > div {
    > section {
      border-left: 3px solid #bfd73e;
      padding-left: 60px;

      strong {
        font-size: 24px;
        font-weight: 500;
        color: #dce89b;
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
      }
    }

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

export const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin-right: 30px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #59617d;
  border: 0;
  transition: background-color 0.2s;

  svg {
    width: 30px;
    height: 30px;
    color: #fff;
  }

  > aside {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    z-index: 1;
    right: 0;
    margin-top: 15px;
    margin-right: 15px;
    width: 380px;
    top: 0;
    transition: visibility 0.2s, opacity 0.2s linear;

    background: white;

    border-radius: 6px;
    border: solid 3px #bfd73e;

    > article {
      display: flex;
      justify-content: center;
      margin: 15px;

      strong {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  &:hover {
    background: ${shade(0.2, '#59617D')};

    > aside {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const NotificationItem = styled.div`
  margin: 15px;
  padding: 15px;

  background: white;

  border-radius: 3px;
  border: solid 1px #bfd73e;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  section {
    flex: 1;
    margin-right: 12px;

    strong {
      font-size: 18px;
      font-weight: 500;
    }

    h2 {
      margin-top: 6px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  > button {
    border: 0;
    background: none;

    svg {
      color: #9b3b37;
      width: 25px;
      height: 25px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#9b3b37')};
      }
    }
  }
`;

export const SubContainer = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 75px;
  margin-top: 100px;
  position: absolute;
  background: ${shade(0.05, '#f8f8f8')};
  border-bottom: solid 0.5px #707070;

  ${props =>
    props.isHome &&
    css`
      animation: ${appearFromTop} 1s;
    `}

  div {
    display: flex;
    align-items: center;
    margin: 0 60px;
  }
`;

export const PageButton = styled.button<PageButtonProps>`
  border: 0;
  background: none;

  font-size: 24px;
  font-weight: 500;
  color: ${props => (props.isSelected ? shade(0.2, '#bfd73e') : '#bfd73e')};
  transition: color 0.2s;

  &:hover {
    color: ${shade(0.2, '#bfd73e')};
  }

  & + button {
    margin-left: 60px;
  }
`;
