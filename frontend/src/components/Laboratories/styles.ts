import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface LaboratoryProps {
  isSelected: boolean;
}

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
  margin: 20px 0;

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

export const Laboratory = styled.div<LaboratoryProps>`
  cursor: pointer;
  margin: 5px;
  width: 120px;
  height: 100%;
  background: ${props =>
    props.isSelected ? shade(0.2, '#bfd73e') : '#bfd73e'};
  border-radius: 10px;
  color: #fff;
  text-align: center;
  padding: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: 700;
    font-size: 24px;
  }

  h2 {
    font-weight: 500;
    font-size: 14px;
  }

  &:hover {
    background: ${shade(0.2, '#bfd73e')};
  }
`;
