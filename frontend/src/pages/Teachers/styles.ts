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
  flex-direction: row;

  width: 1120px;
  margin-top: 20px;

  > strong {
    font-weight: 700;
    font-size: 42px;
    color: #bfd73e;
  }
`;

export const TableContainer = styled.table``;
