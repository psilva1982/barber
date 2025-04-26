import { BarberShopItem } from "@/components/barbershop-item"
import { Header } from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/prisma"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Paulo</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            alt="Agende com os melhores"
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card className="py-0">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit rounded-full">Confirmado</Badge>
              <p className="font-medium">Corte de cabelo</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm font-semibold">Barbearia</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-7">
              <p className="text-sm font-semibold">Maio</p>
              <p className="text-2xl font-semibold">05</p>
              <p className="text-sm font-semibold">20:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
    </div>
  )
}
