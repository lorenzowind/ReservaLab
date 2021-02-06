import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IntervalSectionProps {
  isExpanded?: boolean;
}

interface NameSectionProps {
  color?: string;
}

interface ClassroomSectionProps {
  color?: string;
}

interface ContainerProps {
  operationContext: 'read' | 'update';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  padding: 20px;
  width: ${props => (props.operationContext === 'read' ? '675' : '380')}px;
  height: auto;

  border: 5px solid #bfd73e;
  background: #fff;
  border-radius: 13px;
`;

export const LeftColumn = styled.div<ContainerProps>`
  height: 100%;
  width: ${props => (props.operationContext === 'read' ? '210' : '380')}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > strong {
    align-self: center;
    font-weight: 700;
    font-size: 24px;
    color: #bfd73e;
    line-height: 40px;
  }
`;

export const RightColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  width: 394px;
  margin-left: 10px;
`;

export const InfoSection = styled.div`
  width: 275px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > strong {
    font-weight: 700;
    font-size: 24px;
    color: #bfd73e;
    line-height: 40px;
  }
`;

export const DetailsSection = styled.div`
  width: 115px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > strong {
    font-weight: 700;
    font-size: 24px;
    color: #bfd73e;
    line-height: 40px;
  }
`;

export const TimeSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > strong {
    margin-right: 10px;
  }

  > section {
    display: flex;
  }

  > button {
    border: 0;
    background: none;
    margin-left: 30px;

    svg {
      color: #9b3b37;
      width: 20px;
      height: 20px;
    }

    &:hover {
      svg {
        color: ${shade(0.2, '#9b3b37')};
      }
    }
  }
`;

export const HourSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: 55px;
  margin-right: 2px;
  height: 40px;
  background: #bfd73e;
  border-radius: 5px;
  color: #fff;

  > strong {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const IntervalSection = styled.div<IntervalSectionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: ${props => (props.isExpanded ? '210px' : '150px')};

  ${props =>
    !props.isExpanded &&
    css`
      margin-left: 2px;
    `}

  height: 40px;
  background: #bfd73e;
  border-radius: 5px;
  color: #fff;

  > strong {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const NameSection = styled.div<NameSectionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: 275px;
  height: 40px;
  background: ${props => (props.color ? props.color : '#bfd73e')};
  border-radius: 5px;
  color: #fff;

  ${props =>
    props.color &&
    css`
      cursor: pointer;

      &:hover {
        background: ${shade(0.2, props.color)};
      }
    `}

  > strong {
    padding: 5px;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ClassroomSection = styled.div<ClassroomSectionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: 113px;
  height: 40px;
  background: ${props => (props.color ? props.color : '#bfd73e')};
  border-radius: 5px;
  color: #fff;

  > strong {
    font-size: 18px;
    font-weight: 700;
  }
`;
