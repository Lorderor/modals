import { disabledDateDepart } from "../../utils/disabledDateDepart";
import { DateInput } from "../../components/Form/DateInput"
import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return <DateInput
    label="Depart"
    disabledDate={disabledDateDepart}
    {...props}
    ref={ref}
  />
})