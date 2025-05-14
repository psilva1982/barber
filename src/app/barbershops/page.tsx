import { db } from "@/_lib/prisma"
import { BarberShopItem } from "@/components/barbershop-item"

type Props = {
  searchParams?:  Promise<{ [key: string]: string }>
}

const Barbershop = async ({ searchParams }: Props) => {
 
  const filters = await searchParams
  const search = filters ? filters.search : ""
  
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  })

  return (
    <div className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
      <h2>Resultados para {search}</h2>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barbershop) => (
          <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
        ))}
      </div>
    </div>
  )
}

export default Barbershop
