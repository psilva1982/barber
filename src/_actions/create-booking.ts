"use server"

import { db } from "@/_lib/prisma"
import { revalidatePath } from "next/cache"

type CreateBookingParams = {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: params,
  })
  revalidatePath("/barbershops/[id]", 'page')
}
