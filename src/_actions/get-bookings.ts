"use server"

import { db } from "@/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

type GetBookingParams = {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingParams) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    },
  })
}
