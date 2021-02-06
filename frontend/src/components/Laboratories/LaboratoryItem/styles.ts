import { shade } from 'polished';
import styled from 'styled-components';

interface LaboratoryContainerProps {
  isSelected: boolean;
}

export const LaboratoryContainer = styled.div<LaboratoryContainerProps>`
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

  svg {
    color: transparent;
    position: absolute;
    width: 60px;
    height: 60px;
  }

  &:hover {
    background: ${shade(0.2, '#bfd73e')};

    svg {
      color: #fff;
    }

    strong {
      opacity: 0.5;
    }

    h2 {
      opacity: 0.5;
    }
  }
`;
