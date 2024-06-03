import { Flex } from "antd";
import { Controller, useForm } from "react-hook-form";
import composeRules from "../../utils/composeRules";
import addRequired from "../../utils/addRequired";
import { FormInput } from "../../domain/Field/Input";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { useContext, useEffect, useState } from "react";
import { Footer } from "./Footer";
import { sendMileTypeData } from "./api";
import { DataContext } from "../Context";

const initMileTypeData = {
  milesType: `default`,
  mileName: ``,
  mileInitial: ``,
  mileDescription: ``,
  notes: ``,
};

export const TypeForm = ({ handleNext, isRow }) => {
  const { state, updateState } = useContext(DataContext);
  const { data, mileTypeData, dataStep, dataAttr } = state;
  const [isReadOnly, setIsReadOnly] = useState(false);
  const isDisabled = dataStep !== 1;

  const { handleSubmit, watch, control, setValue } = useForm({
    defaultValues: mileTypeData?.milesType ? mileTypeData : initMileTypeData,
  });

  const keysTypes = Object.keys(data || {});
  const types = keysTypes.length
    ? keysTypes.map((el) => ({
        value: el,
        label: `ID: ` + el + ` Name ` + data[el]?.milesType?.mileName,
      }))
    : [];

  const options = [{ value: `default`, label: `Select miles type` }, ...types];

  const milesType = watch("milesType");

  useEffect(() => {
    if (milesType) {
      const tmp = milesType !== `default` && data[milesType]?.milesType;

      Object.keys(initMileTypeData).forEach((el) => {
        if (el !== `milesType`) setValue(el, milesType !== `default` && tmp ? tmp[el] : ``);
      });
      setIsReadOnly(milesType !== `default`);
    }
  }, [setValue, milesType]);

  const onSubmit = async (values) => {
    if (!isDisabled) {
      const formData = new FormData();
      const offer_id = window.location.pathname.split(`/offer/`)[1];
      formData.append(`offer_id`, offer_id);
      formData.append(`ticketInfoId`, dataAttr["data-id"]);
      Object.keys(values).forEach((el) => {
        formData.append(el, el === `milesType` && values[el] === `default` ? `` : values[el]);
      });
      const res = await sendMileTypeData(formData);
      if (res.status === 200) {
        updateState({
          mileTypeData: values,
          dataStep: dataStep === 1 ? 2 : dataStep,
          pageModal: 2,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical={!isRow} wrap={`wrap`} gap={isRow ? `8px` : 0} width={`100%`}>
        <Controller
          name="milesType"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <SelectInputComponent
                options={options}
                label="Mile Type"
                fieldState={fieldState}
                defaultValue={field.value}
                {...field}
                disabled={isDisabled}
              />
            );
          }}
        />
        <Controller
          name="mileName"
          control={control}
          rules={composeRules(addRequired)}
          render={({ field, fieldState }) => {
            return (
              <FormInput label="Mile Name" {...field} disabled={isReadOnly || isDisabled} fieldState={fieldState} />
            );
          }}
        />
        <Controller
          name="mileInitial"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <FormInput label="Mile Initial" {...field} disabled={isReadOnly || isDisabled} fieldState={fieldState} />
            );
          }}
        />
        <Controller
          name="mileDescription"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <FormInput
                label="Mile Description"
                {...field}
                disabled={isReadOnly || isDisabled}
                fieldState={fieldState}
              />
            );
          }}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => {
            return <FormInput label="Notes" {...field} disabled={isReadOnly || isDisabled} fieldState={fieldState} />;
          }}
        />
      </Flex>
      {!isRow && <Footer handleNext={isDisabled ? handleNext : undefined} />}
    </form>
  );
};
