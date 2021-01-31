import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;

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

  div {
    width: 100%;
    padding: 25px 46px 0px 46px;

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #2f3342;
    }
  }

  > section {
    width: 100%;
    padding: 0px 46px 0px 46px;

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #2f3342;
    }

    p {
      font-size: 20px;
      font-weight: 500;
      color: #2f3342;
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
