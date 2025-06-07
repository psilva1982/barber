"use server"

import { db } from "@/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

type GetBookingParams = {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingParams) => {
  return await db.booking.findMany({
    where: {
      id: "0d586206-6cf0-4351-94fd-d26467aa4a4a",
    },
  })
}
