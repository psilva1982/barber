import { db } from "@/_lib/prisma"
import { BarberShopItem } from "@/components/barbershop-item"
import { Header } from "@/components/header"
import { SearchInput } from "@/components/search"

type Props = {
  searchParams?: Promise<{ [key: string]: string }>
}

const Barbershop = async ({ searchParams }: Props) => {
  const filters = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        filters?.search
          ? {
              name: {
                contains: filters?.search,
                mode: "insensitive",
              },
            }
          : {},
        filters?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: filters.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />

      <div className="my-6 px-4">
        <SearchInput />
      </div>

      <div className="ps-2 pe-4 pb-4">
        <h2 className="mt-2 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para {filters?.search ?? filters?.service}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Barbershop
