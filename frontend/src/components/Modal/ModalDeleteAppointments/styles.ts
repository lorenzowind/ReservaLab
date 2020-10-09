import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 28px;
    font-weight: 700;
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

      b {
        color: #9b3b37;
      }
    }
  }

  > div {
    width: 100%;
    padding: 25px 46px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const OptionsContainer = styled.section`
  width: 100%;
  padding: 25px 46px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  > button {
    height: 60px;
    width: 50%;
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
