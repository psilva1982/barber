import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ id: string }>
}

const BarbershopPage = async ({ params }: Props) => {
    const { id } = await params
    const barbershop = await db.barbershop.findUnique({
        where: {
            id
        }
    })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div>
            <div className="relative w-full h-[250px]">
                <Image src={barbershop!.imageUrl} fill className="object-cover" alt={barbershop!.name} />
                <Button size="icon" variant="secondary" className="absolute top-4 left-4" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Button size="icon" variant="secondary" className="absolute top-4 right-4">
                    <MenuIcon />
                </Button>
            </div>
            <div className="p-5 border-b border-solid">
                <h1 className="text-xl font-bold">{barbershop?.name}</h1>
                <div className="flex items-center gap-1 mb-2">
                    <MapIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop?.address}</p>
                </div>
                <div className="flex items-center gap-1">
                    <StarIcon className="text-primary fill-primary" size={18} />
                    <p className="text-sm">5,0 (8009 avaliações)</p>
                </div>
            </div>


            {/* Description */}
            <div className="p-5 border-b border-solid space-y-3">
                <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
                <p className="text-sm text-justify">{barbershop?.description}</p>
            </div>
        </div>
    );
}

export default BarbershopPage;