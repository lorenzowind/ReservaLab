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
    padding: 16px 46px;

    width: 100%;
    height: 120px;
    background: #f8f8f8;
    border-bottom: solid 0.5px #707070;

    h1 {
      font-weight: 700;
      font-size: 32px;
      color: #bfd73e;
      text-align: right;

      margin-right: 20px;
      width: 300px;
    }

    nav {
      width: 300px;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 280px;
        margin-left: 20px;
        height: 50px;
        border-radius: 13px;
        border: solid 0.5px #707070;
        background: #fff;

        div {
          width: 90%;
          height: 100%;
          color: #2f3342;
          font-weight: 400;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 46px 40px 46px;

    section {
      display: flex;
      flex-direction: column;

      > div {
        margin: 15px 0;
        width: 300px;
        height: 60px;
        padding: 8px 16px;

        select {
          width: 100%;
        }
      }
    }
  }

  > button {
    height: 60px;
    width: 50%;
    margin-bottom: 25px;
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
