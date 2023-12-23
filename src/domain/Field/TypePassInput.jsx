import { forwardRef } from "react"
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput"

export default forwardRef((props, ref) => {
    return <SelectInputComponent
    options={[
      { value: "Adults", label: "Adults" },
      { value: "Children", label: "Children" },
      { value: "Infants", label: "Infants" },
    ]}
    label="Type"
    defaultValue={props.value}
    {...props} 
    ref={ref}/>
})