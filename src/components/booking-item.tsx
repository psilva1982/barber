import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

type Props = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true }
      }
    }
  }>
}

const BookingItem = ({ booking }: Props) => {

  const isConfirmed = isFuture(booking.date)

  return (
    <Card className="min-w-[90%] py-0">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge variant={isConfirmed ? 'default' : 'secondary'} className="w-fit rounded-full">{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>
          <p className="font-medium">{booking.service.name}</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm font-semibold">
              {booking.service.barbershop.name}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-7">
          <p className="text-sm font-semibold capitalize">{format(booking.date, 'MMMM', { locale: ptBR})}</p>
          <p className="text-2xl font-semibold">{format(booking.date, 'dd', { locale: ptBR})}</p>
          <p className="text-sm font-semibold">{format(booking.date, 'HH:mm', { locale: ptBR})}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export { BookingItem }
