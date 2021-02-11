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

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 1120px;

  > strong {
    font-weight: 700;
    font-size: 42px;
    color: #bfd73e;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-top: 30px;

    section {
      display: flex;
      flex-direction: column;

      > button {
        align-self: flex-end;
        height: 60px;
        width: 380px;
      }
    }
  }
`;

export const CasesContainer = styled.div`
  width: 380px;
  height: 560px;
  border: 5px solid #bfd73e;
  background: #fff;
  border-radius: 13px;

  overflow-y: auto;

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
`;

export const CaseItem = styled.div`
  cursor: pointer;
  position: relative;
  margin: 15px;
  padding: 15px;
  background: #fff;
  border-left: 3px solid #2f3342;
  transition: background-color 0.2s;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${shade(0.2, '#fff')};
  }

  h4 {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #9b3b37;
  }

  section {
    flex: 1;
    margin-right: 12px;

    h3 {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
      color: #2f3342;
    }

    strong {
      font-size: 16px;
      font-weight: 500;
      color: #2f3342;
    }

    h2 {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 500;
      color: ${shade(0.2, '#2f3342')};
    }
  }

  svg {
    color: #2f3342;
    width: 25px;
    height: 25px;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: ${shade(0.2, '#fff')};

  svg {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    color: #9b3b37;
  }

  h2 {
    margin-left: 10px;
    color: #9b3b37;
    font-weight: 700;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  width: 680px;
  height: 470px;
  border: 5px solid #bfd73e;
  background: #fff;
  border-radius: 13px;
  margin-top: 30px;
`;
