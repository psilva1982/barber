import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

const BookingItem = () => {
  return (
    <>
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
    </>
  )
}

export { BookingItem }
