import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface LaboratoriesMapProps {
  selectedFloor: number;
}

export const LaboratoriesMap = styled.div<LaboratoriesMapProps>`
  max-width: 1120px;

  > strong {
    font-weight: 700;
    font-size: 42px;
    color: #bfd73e;
  }

  > section {
    margin-top: 10px;

    button {
      border: 0;
      background: none;

      font-weight: 700;
      font-size: 24px;
      color: #bfd73e;

      &:hover {
        color: ${shade(0.2, '#bfd73e')};
      }

      &:first-child {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 3px solid #bfd73e;
      }

      ${props => css`
        &:nth-child(${props.selectedFloor}) {
          color: ${shade(0.2, '#bfd73e')};
        }
      `}
    }
  }
`;

export const LaboratoryMap = styled.div`
  max-width: 1120px;
  border: 5px solid #bfd73e;
  background: #fff;
  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-top: 20px;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > div {
      height: 90px;
    }
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    > div {
      height: 190px;
    }

    > section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  > div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
