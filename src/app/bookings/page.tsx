import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const pastBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div>
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
                Confirmados
              </h2>
              <div className="flex flex-col space-y-3">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {pastBookings.length > 0 && (
          <div>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Finalizados
            </h2>
            <div className="flex flex-col space-y-3">
              {pastBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Bookings
