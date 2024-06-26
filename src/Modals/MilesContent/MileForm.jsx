import { Flex, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/Form/DateInput";
import dayjs from "dayjs";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { FormInput } from "../../domain/Field/Input";
import { FormInputPassword } from "../../domain/Field/InputPassword";
import { useContext, useEffect } from "react";
import { Footer } from "./Footer";
import { changeMileData, sendMileData } from "./api";
import { DataContext } from "../Context";

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
  archived: 0,
};

export const MileForm = ({ handlePrev, isRow }) => {
  const { state, updateState } = useContext(DataContext);
  const { data, mileTypeData, mileData,pageModal, dataAttr, dataStep } = state;
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: mileData?.milesList ? mileData : initMileData,
  });
  const isChange = dataStep >= 3;

  const miles = data[mileTypeData?.milesType]?.miles;
  const milesOptions = miles
    ? miles.map((el) => ({
        value: String(el.id),
        label: `ID: ${el.id} ${el.accountFirstName} ${el.accountLastName}`,
      }))
    : [];
  const options = [{ value: `default`, label: `Select miles name` }, ...milesOptions];
  const milesList = watch("milesList");

  useEffect(() => {
    if (
      milesList &&
      data &&
      mileTypeData.milesType &&
      data[mileTypeData.milesType] &&
      data[mileTypeData?.milesType]?.miles
    ) {
      const tmp =
        milesList !== `default` &&
        data[mileTypeData?.milesType]?.miles.find((el) => String(el.id) === String(milesList));
      Object.keys(initMileData).forEach((el) => {
        if (el !== `milesList`)
          setValue(el, milesList !== `default` && tmp ? tmp[el] : ``, {
            shouldDirty: false,
          });
      });
    }
  }, [setValue, milesList]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append(`ticketInfoId`, dataAttr["data-id"]);
    Object.keys(values).forEach((el) => {
      formData.append(el, el === `milesList` && values[el] === `default` ? `` : values[el]);
    });
    const res = isChange ? await changeMileData(formData) : await sendMileData(formData);
    if (res.status === 200) {
      updateState({ mileData: values, dataStep: isChange ? dataStep : 3, pageModal: isChange ? pageModal: 3 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical={isRow} justify={`space-between`} width={`100%`} wrap={`wrap`}>
        <Flex width={`100%`} wrap={`wrap`} gap={isRow ? `8px` : 0} vertical={!isRow}>
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
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}

                />
              );
            }}
          />
          <Controller
            name="accountFirstName"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Account First Name" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="accountLastName"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Account Last Name" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="accountNumber"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Account Number" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Email" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="emailPassword"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInputPassword label="Email Password" {...field}  fieldState={fieldState} />
              );
            }}
          />
        </Flex>
        <Flex width={`100%`} wrap={`wrap`} gap={isRow ? `8px` : 0} vertical={!isRow}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Phone Number" {...field}  fieldState={fieldState} />;
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
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}

                />
              );
            }}
          />
          <Controller
            name="CConFileNote"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="CC on File Note" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInputPassword label="Password" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Note" {...field}  fieldState={fieldState} />;
            }}
          />
          <Controller
            name="pinNumber"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Pin Number" {...field}  fieldState={fieldState} />;
            }}
          />
          {isRow && (
            <Button htmlType={`submit`} size={`large`} type={`primary`} disabled={!isDirty}>
              Save changes
            </Button>
          )}
        </Flex>
      </Flex>
      {!isRow && <Footer handlePrev={handlePrev} />}
    </form>
  );
};
