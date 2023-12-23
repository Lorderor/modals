import { Col } from "antd";
import { Controller, useForm } from "react-hook-form";
import composeRules from "../../utils/composeRules";
import addRequired from "../../utils/addRequired";
import { FormInput } from "../../domain/Field/Input";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { sendMileTypeData } from "./api";

const initMileTypeData = {
  mileType: `default`,
  mileName: ``,
  mileInitial: ``,
  mileDescription: ``,
  notes: ``,
};

export const AddMileType = ({
  data,
  handleNext,
  setMileTypeData,
  handlePrev,
  mileTypeData,
  dataAttr,
}) => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { handleSubmit, watch, control, setValue } = useForm({
    defaultValues: mileTypeData?.mileType ? mileTypeData : initMileTypeData,
  });

  const keysTypes = Object.keys(data || {});
  const types = keysTypes.length
    ? keysTypes.map((el) => ({
        value: el,
        label: `ID: ` + el + ` Name ` + data[el]?.milesType?.mileName,
      }))
    : [];

  const options = [{ value: `default`, label: `Select miles type` }, ...types];

  const mileType = watch("mileType");

  useEffect(() => {
    if (mileType) {
      const tmp = mileType !== `default` && data[mileType]?.milesType;

      Object.keys(initMileTypeData).forEach((el) => {
        if (el !== `mileType`)
          setValue(el, mileType !== `default` ? tmp[el] : ``);
      });
      setIsReadOnly(mileType !== `default`);
    }
  }, [setValue, mileType]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    const offer_id = window.location.pathname.split(`/offer/`)[1];
    formData.append(`offer_id`, offer_id);
    formData.append(`ticketInfoId`, dataAttr["data-id"]);
    Object.keys(values).forEach((el) => {
      formData.append(
        el,
        el === `mileType` && values[el] === `default` ? `` : values[el]
      );
    });
    const res = await sendMileTypeData(formData);
    if (res.status === 200) {
      setMileTypeData(values);
      handleNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Col>
        <Controller
          name="mileType"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <SelectInputComponent
                options={options}
                label="Mile Type"
                fieldState={fieldState}
                defaultValue={field.value}
                {...field}
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
              <FormInput
                label="Mile Name"
                {...field}
                disabled={isReadOnly}
                fieldState={fieldState}
              />
            );
          }}
        />
        <Controller
          name="mileInitial"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <FormInput
                label="Mile Initial"
                {...field}
                disabled={isReadOnly}
                fieldState={fieldState}
              />
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
                disabled={isReadOnly}
                fieldState={fieldState}
              />
            );
          }}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <FormInput
                label="Notes"
                {...field}
                disabled={isReadOnly}
                fieldState={fieldState}
              />
            );
          }}
        />
      </Col>
      <Footer handlePrev={handlePrev} />
    </form>
  );
};
