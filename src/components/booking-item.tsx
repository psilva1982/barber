"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import BookingSummary from "./book-summary"
import BarbershopContact from "./barbershop-contact"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { toast } from "sonner"
import { deleteBooking } from "@/_actions/delete-booking";
import { useState } from "react";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isConfirmed = isFuture(booking.date)
  const { service: {barbershop} } = booking

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full py-0">
        <Card className="w-[90%] py-0">
          <CardContent className="flex justify-between p-0 w-full">
            <div className="flex flex-col items-start gap-2 py-5 pl-5">
              <Badge
                variant={isConfirmed ? "default" : "secondary"}
                className="w-fit rounded-full"
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
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
              <p className="text-sm font-semibold capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl font-semibold">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm font-semibold">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%] px-4">
        <SheetHeader className="px-0">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>
        <div className="">
          <div className="relative h-[180px] w-full flex items-end justify-center">
            <Image src="/map.png" fill className="object-cover rounded-xl" alt="" />
            <Card className="z-20 w-full mx-5 mb-3 py-3">
              <CardContent className="px-3 flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs text-muted-foreground">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3 mt-6">
            {barbershop.phones.map((phone, index) => (
              <BarbershopContact key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6 px-0">
          <div className="flex items-center gap-3 w-full">
            <SheetClose asChild>
              <Button variant="outline" className="w-[50%]">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá
                      recuperá-la. Essa ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-[50%]">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button
                        variant="destructive"
                        onClick={handleCancelBooking}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}

export { BookingItem }
