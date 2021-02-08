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

export const HelpButton = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin-bottom: 30px;
  margin-right: 60px;
  width: 60px;
  height: 60px;
  border: 0;
  background: #2f3342;
  border-radius: 50%;
  transition: background-color 0.2s;

  animation: ${appearWithFade} 1s;

  svg {
    width: 60px;
    height: 60px;
    color: #f8f8f8;
    transition: color 0.2s;
  }

  &:hover {
    color: ${shade(0.2, '#2f3342')};

    svg {
      color: ${shade(0.2, '#f8f8f8')};
    }
  }
`;
