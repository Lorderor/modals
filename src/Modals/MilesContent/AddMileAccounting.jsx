import { Col, Row } from "antd";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/Form/DateInput";
import dayjs from "dayjs";
import composeRules from "../../utils/composeRules";
import addRequired from "../../utils/addRequired";
import { FormInput } from "../../domain/Field/Input";
import { SelectInput as SelectInputComponent } from "../../components/Form/SelectInput";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { sendMileAccountingData } from "./api";

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

export const AddMileAccounting = ({ handlePrev, dataAttr }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { handleSubmit, watch, control, setValue } = useForm({
    defaultValues: initMileAccountingData,
  });

  const status = watch("status");
  useEffect(() => {
    if (status) {
      setIsReadOnly(+status === 0);
    }
  }, [setValue, status]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append(`ticketInfoId`, dataAttr["data-id"]);
    Object.keys(values).forEach((el) => {
      formData.append(el, values[el]);
    });
    await sendMileAccountingData(formData);
    // const res = await sendMileAccountingData(formData);
    // if (res.status === 200) {
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row justify={`space-between`}>
        <Col>
          <Controller
            name="soldQTY"
            control={control}
            rules={composeRules(addRequired)}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Sold QTY"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="rate"
            control={control}
            rules={composeRules(addRequired)}
            render={({ field, fieldState }) => {
              return (
                <FormInput label="Rate" {...field} fieldState={fieldState} />
              );
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
                  defaultValue={
                    field.value ? dayjs(field.value, "MM/DD/YY") : undefined
                  }
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
                  defaultValue={
                    field.value ? dayjs(field.value, "MM/DD/YY") : undefined
                  }
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
              return (
                <FormInput
                  label="Used By Agent"
                  {...field}
                  fieldState={fieldState}
                />
              );
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
            name="notes"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput label="Notes" {...field} fieldState={fieldState} />
              );
            }}
          />
          <Controller
            name="zohoBooking"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Zoho Booking"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="bookingLC"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Booking LC"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
        </Col>
        <Col>
          <Controller
            name="bookingTaxAmount"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Booking Tax Amount"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="totalAmount"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Total Amount"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="CCUsedToBook"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="CC Used To Book"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="bookingPNR"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Booking PNR"
                  {...field}
                  fieldState={fieldState}
                />
              );
            }}
          />
          <Controller
            name="carrierPNR"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <FormInput
                  label="Carrier PNR"
                  {...field}
                  fieldState={fieldState}
                />
              );
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
            name="expectedDateRefundTax"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DateInput
                  label="Expected Tax refund"
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
              return (
                <FormInput
                  label="Tax Amount"
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
