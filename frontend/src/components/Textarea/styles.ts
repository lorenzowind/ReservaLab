import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.textarea<ContainerProps>`
  color: #2f3342;
  font-size: 20px;
  font-weight: 400;
  resize: none;
  border-radius: 13px;
  padding: 16px;

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
      border-color: #bfd73e;
    `}

  &::placeholder {
    color: #666360;
  }
`;
