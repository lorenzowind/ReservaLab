import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px;
  width: 100%;
  border-radius: 13px;
  border: solid 0.5px #707070;
  background: #fff;

  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      color: #bfd73e;
      border-color: #bfd73e;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #bfd73e;
    `}

  > div {
    flex: 1;
    border: 0;
    color: #2f3342;
    font-weight: 400;
    font-size: 20px;
    height: 100%;

    display: flex;
    align-items: center;

    div {
      color: #2f3342;
    }

    > div {
      flex: 1;
      border: 0;
      box-shadow: 0 0 0 0;
      cursor: pointer;

      &:first-child {
        display: flex;
        align-items: center;
        height: 100%;
      }

      &:nth-child(2) {
        height: 100%;
      }

      > div {
        height: 100%;

        &:first-child {
          overflow-y: auto;
        }

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
      }

      &:nth-child(3) {
        box-shadow: 0 0 0 0.5px #707070;
      }

      &:hover {
        border-color: transparent;
      }

      svg {
        margin: 0;
      }
    }
  }

  svg {
    margin-right: 8px;
  }
`;
