import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: 700;
    color: #2f3342;
    margin-right: 20px;
  }

  select {
    color: #2f3342;
    font-weight: 400;
    font-size: 20px;
    height: 100%;
    cursor: pointer;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 66px;

    width: 100%;
    height: 120px;
    background: #f8f8f8;
    border-bottom: solid 0.5px #707070;

    h1 {
      font-weight: 700;
      font-size: 32px;
      color: #bfd73e;
    }
  }

  > section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 66px 20px 66px;

    aside {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div {
      margin: 10px 0px;
      width: 100%;
      height: 60px;
      padding: 8px 16px;

      select {
        width: 100%;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 66px 20px 66px;

    button {
      height: 60px;

      &:first-child {
        margin-right: 15px;
      }

      &:last-child {
        margin-left: 15px;
      }
    }
  }

  > article {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 66px 20px 66px;

    button {
      width: 50%;
      height: 60px;
    }
  }
`;

export const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  strong {
    cursor: pointer;
    font-size: 32px;
    font-weight: 700;
    color: #2f3342;
  }
`;
