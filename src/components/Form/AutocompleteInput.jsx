import { forwardRef } from "react";
import { FloatLabel, Select } from "../../components";
import {useGetErrorProps} from "../../hooks/useGetErrorProps";

const filterOption = (input, option) => {
  if (option) {
    return String(option.label).toUpperCase().includes(input.toUpperCase());
  }
  return false;
}

export const AutocompleteInput = forwardRef((props, ref) => {

  const { value, name, label, options: optionsProps, fieldState, ...rest } = props;

  const errorProps = useGetErrorProps(fieldState);

  return (
    <FloatLabel label={label} name={name} value={value} {...errorProps}>
      <Select
        showSearch
        style={{ width: "100%" }}
        size="large"
        placeholder=""
        status={errorProps.status}
        {...rest}
        filterOption={filterOption}
        options={optionsProps}
        ref={ref}
      />
    </FloatLabel>
  );
});
