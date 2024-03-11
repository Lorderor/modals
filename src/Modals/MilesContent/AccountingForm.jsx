import { Button, Flex } from "antd";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/Form/DateInput";
import dayjs from "dayjs";
import composeRules from "../../utils/composeRules";
import addRequired from "../../utils/addRequired";
import { FormInput } from "../../domain/Field/Input";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { Footer } from "./Footer";
import { useContext, useEffect, useState } from "react";
import { changeMileAccountingData, sendMileAccountingData } from "./api";
import { DataContext } from "../Context";

const initMileAccountingData = {
  soldQTY: ``,
  rate: ``,
  dateUsed: ``,
  dateItineraryComplete: ``,
  usedByAgent: ``,
  status: `0`,
  note: ``,
  zohoBooking: ``,
  bookingLC: ``,
  bookingTaxAmount: ``,
  totalAmount: ``,
  CCUsedToBook: ``,
  bookingPNR: ``,
  carrierPNR: ``,
  expectedDate: ``,
  expectedDateRefundTax: ``,
  refundTaxes: ``,
  amount: ``,
};

export const AccountingForm = ({ handlePrev, isRow }) => {
  const { state, updateState } = useContext(DataContext);
  const { mileAccountingData, dataStep, dataAttr } = state;
  const [isReadOnly, setIsReadOnly] = useState(true);
  const {
    handleSubmit,
    watch,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: mileAccountingData?.soldQTY ? mileAccountingData : initMileAccountingData,
  });
  const isChange = dataStep >= 4;

  const status = watch("status");
  useEffect(() => {
    if (status) {
      setIsReadOnly(+status === 0);
    }
  }, [status]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append(`ticketInfoId`, dataAttr["data-id"]);
    Object.keys(values).forEach((el) => {
      formData.append(el, values[el]);
    });
    const res = isChange ? await changeMileAccountingData(formData) : await sendMileAccountingData(formData);
    if (res.status === 200) {
      updateState({
        mileAccountingData: values,
        dataStep: isChange ? dataStep : dataStep + 1,
        pageModal: 4,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical={isRow} justify={`space-between`} wrap={`wrap`} width={`100%`}>
        <Flex width={`100%`} wrap={`wrap`} gap={isRow ? `8px` : 0} vertical={!isRow}>
          <Controller
            name="soldQTY"
            control={control}
            rules={composeRules(addRequired)}
            render={({ field, fieldState }) => {
              return <FormInput label="Sold QTY" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="rate"
            control={control}
            rules={composeRules(addRequired)}
            render={({ field, fieldState }) => {
              return <FormInput label="Rate" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="dateUsed"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Date Used"
                  fieldState={fieldState}
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="dateItineraryComplete"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Date Itinerary Complete"
                  fieldState={fieldState}
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="usedByAgent"
            control={control}
            rules={composeRules(addRequired)}
            render={({ field, fieldState }) => {
              return <FormInput label="Used By Agent" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <SelectInputComponent
                  options={[
                    { value: `0`, label: "Open" },
                    { value: `1`, label: "Refund" },
                  ]}
                  label="Status"
                  fieldState={fieldState}
                  defaultValue={field.value}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Notes" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="zohoBooking"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Zoho Booking" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="bookingLC"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Booking LC" {...field} fieldState={fieldState} />;
            }}
          />
        </Flex>
        <Flex width={`100%`} wrap={`wrap`} gap={isRow ? `8px` : 0} vertical={!isRow}>
          <Controller
            name="bookingTaxAmount"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Booking Tax Amount" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="totalAmount"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Total Amount" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="CCUsedToBook"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="CC Used To Book" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="bookingPNR"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Booking PNR" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="carrierPNR"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Carrier PNR" {...field} fieldState={fieldState} />;
            }}
          />
          <Controller
            name="expectedDate"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Expected Miles refund"
                  fieldState={fieldState}
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}
                  disabled={isReadOnly}
                />
              );
            }}
          />
          <Controller
            name="expectedDateRefundTax"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Expected Tax refund"
                  fieldState={fieldState}
                  defaultValue={field.value ? dayjs(field.value, "MM/DD/YY") : undefined}
                  {...field}
                  disabled={isReadOnly}
                />
              );
            }}
          />
          <Controller
            name="refundTaxes"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <SelectInputComponent
                  options={[
                    { value: `0`, label: "Yes" },
                    { value: `1`, label: "No" },
                  ]}
                  label="Refund taxes"
                  fieldState={fieldState}
                  defaultValue={field.value}
                  {...field}
                  disabled={isReadOnly}
                />
              );
            }}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => {
              return <FormInput label="Tax Amount" {...field} disabled={isReadOnly} fieldState={fieldState} />;
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
