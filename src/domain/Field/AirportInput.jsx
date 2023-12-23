import { forwardRef } from "react";
import { AutocompleteInput } from "../../components/Form/AutocompleteInput";
import { airports, airportsOptions } from "../../constants/airports";

export const getAirportValue = (id) => {
  return airports[id];
};

export default forwardRef((props, ref) => {
  return (
    <AutocompleteInput
      options={airportsOptions}
      label="Airport"
      {...props}
      defaultValue={props.value}
      ref={ref}
    />
  );
});
