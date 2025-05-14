import { BarberShopItem } from "@/components/barbershop-item"
import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { quickSearchOptions } from "@/_constants/search"
import { db } from "@/_lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { SearchInput } from "@/components/Search"

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

        <div className="mt-6">
          <SearchInput />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            alt="Agende com os melhores"
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

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
