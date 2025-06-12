"use server"

import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

type CreateBookingParams = {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {

  const session = await getServerSession(authOptions)
  if(!session) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: {...params, userId: (session.user as any).id},
  })
  revalidatePath("/barbershops/[id]", 'page')
}
