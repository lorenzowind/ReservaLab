import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface Props {
  color?: string;
}

export const Container = styled.button<Props>`
  background: ${props => (props.color ? props.color : '#2f3342')};
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  color: #fff;
  border: 0;
  border-radius: 13px;
  transition: background-color 0.2s;

  ${props =>
    props.color
      ? css`
          &:hover {
            background: ${shade(0.2, props.color)};
          }
        `
      : css`
          &:hover {
            background: ${shade(0.2, '#2f3342')};
          }
        `}
`;
