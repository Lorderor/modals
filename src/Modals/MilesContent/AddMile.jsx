import { Col, Row } from "antd";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/Form/DateInput";
import dayjs from "dayjs";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { FormInput } from "../../domain/Field/Input";
import { FormInputPassword } from "../../domain/Field/InputPassword";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { sendMileData } from "./api";

const initMileData = {
  milesList: `default`,
  datePurchased: ``,
  accountFirstName: ``,
  accountLastName: ``,
  accountNumber: ``,
  email: ``,
  emailPassword: ``,
  phoneNumber: ``,
  dob: ``,
  CConFileNote: ``,
  password: ``,
  note: ``,
  pinNumber: ``,
};

export const AddMile = ({
  data,
  mileTypeData,
  handleNext,
  handlePrev,
  mileData,
  setMileData,
  dataAttr,
}) => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { handleSubmit, watch, control, setValue } = useForm({
    defaultValues: mileData.milesList ? mileData : initMileData,
  });
  const miles = data[mileTypeData?.mileType]?.miles;
  const milesOptions = miles
    ? miles.map((el) => ({
        value: el.id,
        label: `ID: ${el.id} ${el.accountFirstName} ${el.accountLastName}`,
      }))
    : [];
  const options = [
    { value: `default`, label: `Select miles name` },
    ...milesOptions,
  ];
  const milesList = watch("milesList");

  useEffect(() => {
    if (milesList) {
      const tmp =
        milesList !== `default` &&
        data[mileTypeData.mileType].miles.find((el) => el.id === milesList);
      Object.keys(initMileData).forEach((el) => {
        if (el !== `milesList`)
          setValue(el, milesList !== `default` ? tmp[el] : ``);
      });
      setIsReadOnly(milesList !== `default`);
    }
  }, [setValue, milesList]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append(`ticketInfoId`, dataAttr["data-id"]);
    Object.keys(values).forEach((el) => {
      formData.append(
        el,
        el === `milesList` && values[el] === `default` ? `` : values[el]
      );
    });
    const res = await sendMileData(formData);
    if (res.status === 200) {
      setMileData(values);
    }
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row justify={`space-between`}>
        <Col>
          <Controller
            name="milesList"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <SelectInputComponent
                  options={options}
                  label="Mile Name"
                  fieldState={fieldState}
                  defaultValue={field.value}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="datePurchased"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Date Acquired"
                  fieldState={fieldState}
                  defaultValue={
                    field.value ? dayjs(field.value, "MM/DD/YY") : undefined
                  }
                  {...field}
                  disabled={isReadOnly}
                />
              );
            }}
          />
          <Controller
            name="accountFirstName"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Account First Name"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="accountLastName"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Account Last Name"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="accountNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Account Number"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Email"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="emailPassword"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInputPassword
                  label="Email Password"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
        </Col>
        <Col>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Phone Number"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="DOB"
                  fieldState={fieldState}
                  defaultValue={
                    field.value ? dayjs(field.value, "MM/DD/YY") : undefined
                  }
                  {...field}
                  disabled={isReadOnly}
                />
              );
            }}
          />
          <Controller
            name="CConFileNote"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="CC on File Note"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInputPassword
                  label="Password"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Note"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="pinNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Pin Number"
                  {...field}
                  disabled={isReadOnly}
                  fieldState={fieldState}
                />
              );
            }}
          />
        </Col>
      </Row>
      <Footer handlePrev={handlePrev} />
    </form>
  );
};

// const form_data = {
//   ticketInfoId: 107,
//   milesList: 169,
//   phoneNumber: ``,
//   datePurchased: ``,
//   dob: ``,
//   accountFirstName: `tests`,
//   CConFileNote: ``,
//   accountLastName: ``,
//   emailForwarded: `06 / 15 / 2023`,
//   accountNumber: ``,
//   password: 123456,
//   email: ``,
//   note: ``,
//   emailPassword: ``,
//   pinNumber: ``,
// };
