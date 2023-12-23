import { forwardRef } from "react"
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput"

export default forwardRef((props, ref) => {
    return <SelectInputComponent
    options={[
      { value: "Business", label: "Business" },
      { value: "First", label: "First" },
      { value: "Economy", label: "Economy" },
    ]}
    label="Cabin Class"
    defaultValue={props.value}
    {...props} 
    ref={ref}/>
})