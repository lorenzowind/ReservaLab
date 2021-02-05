import styled from 'styled-components';

interface OptionsContainerProps {
  isCompleteFormat?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 20px;
    font-weight: 500;
    color: #2f3342;
    margin-right: 20px;
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
    }
  }

  > div {
    width: 100%;
    padding: 25px 46px 0px 46px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #2f3342;
      margin-right: 20px;

      & + h1 {
        margin-top: 10px;
      }
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  > section {
    width: 100%;
    padding: 10px 46px 25px 46px;

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #2f3342;

      & + h1 {
        margin-top: 10px;
      }
    }

    p {
      font-size: 20px;
      font-weight: 500;
      color: #2f3342;
    }
  }
`;

export const OptionsContainer = styled.section<OptionsContainerProps>`
  width: 100%;
  padding: 25px 46px;
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.isCompleteFormat ? 'space-between' : 'center'};
  align-items: flex-start;

  > button {
    height: 60px;
    width: 50%;
    margin-right: 15px;
  }

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 15px;

    width: 50%;

    > div {
      height: 60px;

      select {
        cursor: pointer;
      }
    }

    > button {
      height: 60px;
      width: 100%;
      margin-top: 10px;
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
