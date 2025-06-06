"use server"

import { db } from "@/_lib/prisma"

type CreateBookingParams = {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: params,
  })
}
