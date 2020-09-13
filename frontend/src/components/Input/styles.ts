import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px;
  width: 100%;
  border-radius: 13px;
  border: solid 0.5px #707070;
  background: #fff;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #2f3342;
    font-weight: 400;
    font-size: 20px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
