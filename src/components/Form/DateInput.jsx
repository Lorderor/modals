import { forwardRef } from "react";

import { DatePicker, FloatLabel } from "..";
import { useGetErrorProps } from "../../hooks/useGetErrorProps";

export const DateInput = forwardRef((props, ref) => {
  const { value, name, label, fieldState, ...rest } = props;

  const errorProps = useGetErrorProps(fieldState);

  return (
    <FloatLabel label={label} name={name} value={value} {...errorProps}>
      <DatePicker
        style={{ width: "100%" }}
        placeholder=""
        format="MM/DD/YY"
        size="large"
        {...rest}
        status={errorProps.status}
        ref={ref}
      />
    </FloatLabel>
  );
});
