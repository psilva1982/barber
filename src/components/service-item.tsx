import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

type Props = {
  service: BarbershopService
}

const ServiceItem = ({ service }: Props) => {
  return (
    <Card className="p-0">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative h-[110px] max-h-[110px] w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={service.name}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ServiceItem }
