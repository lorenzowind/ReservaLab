import styled, { css } from 'styled-components';

interface IntervalSectionProps {
  isExpanded?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  padding: 20px;
  width: 675px;
  height: auto;

  border: 5px solid #bfd73e;
  background: #fff;
  border-radius: 13px;
`;

export const LeftColumn = styled.div`
  height: 100%;
  width: 210px;
  margin-right: 5px;
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

export const RightColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  width: 394px;
  margin-left: 5px;
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

  > strong {
    margin-right: 10px;
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

export const LunchSection = styled.div`
  display: flex;
  flex-direction: row;

  > strong {
    font-weight: 700;
    word-break: break-all;
    padding: 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px 0;
    width: 55px;
    margin-right: 2px;
    height: 84px;
    background: #bfd73e;
    border-radius: 5px;
    color: #fff;
    font-size: 10px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const NameSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: 275px;
  height: 40px;
  background: #bfd73e;
  border-radius: 5px;
  color: #fff;

  > strong {
    padding: 5px;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ClassroomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  width: 113px;
  height: 40px;
  background: #bfd73e;
  border-radius: 5px;
  color: #fff;

  > strong {
    font-size: 18px;
    font-weight: 700;
  }
`;
