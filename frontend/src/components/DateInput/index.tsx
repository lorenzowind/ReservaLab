import React from 'react';
import ptLocale from 'date-fns/locale/pt';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface Props {
  date: Date;
  setDate(date: Date): void;
}

const DateInput: React.FC<Props> = ({ date, setDate }) => {
  const handleDateChange = (value: Date | null) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <KeyboardDatePicker
        disableToolbar
        disablePast
        error={false}
        helperText={null}
        variant="inline"
        format="dd/MM/yyyy"
        value={date}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
