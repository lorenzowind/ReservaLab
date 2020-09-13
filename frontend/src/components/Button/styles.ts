import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #2f3342;
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  color: #fff;
  border: 0;
  border-radius: 13px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#2f3342')};
  }
`;
