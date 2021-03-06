import React, { useCallback, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import Select from 'react-select';

import { Container } from './styles';

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  isDisabled?: boolean;
  placeholder: string;
  options: Option[];
  defaultValues?: Option[];
  selectedOptions: Option[];
  setSelectedOptions(options: Option[]): void;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  isDisabled,
  placeholder,
  options,
  defaultValues,
  selectedOptions,
  setSelectedOptions,
  containerStyle = {},
  icon: Icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleChange = useCallback(
    targets => {
      setSelectedOptions(targets);
    },
    [setSelectedOptions],
  );

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectedOptions);
  }, [selectedOptions]);

  return (
    <Container
      style={containerStyle}
      isFilled={isFilled}
      isFocused={isFocused}
      isDisabled={isDisabled}
    >
      {Icon && <Icon size={20} />}

      <Select
        isDisabled={isDisabled}
        isMulti
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValues}
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
      />
    </Container>
  );
};

export default MultiSelect;
