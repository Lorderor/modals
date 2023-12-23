import dayjs from "dayjs"

export const getDisabledPrevDate = (current) => {
    return current < dayjs().endOf("day").subtract(1, "day")
  }