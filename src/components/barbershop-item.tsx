import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

type Props = {
  barbershop: Barbershop
}

const BarberShopItem = async ({ barbershop }: Props) => {
  return (
    <Card className="w-[168px] p-0">
      <CardContent className="p-1">
        <div className="relative mb-3 h-[159px] w-[159px]">
          <Image
            src={barbershop.imageUrl}
            fill
            className="rounded-t-lg object-cover"
            alt={barbershop.name}
          />

          <Badge
            className="absolute top-2 left-2 opacity-90"
            variant={"secondary"}
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="mt-0.5">5.0</span>
          </Badge>
        </div>
        <div className="px-1 py-2">
          <p className="truncate font-semibold">{barbershop.name}</p>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant={"secondary"} className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { BarberShopItem }
