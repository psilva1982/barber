import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Link from "next/link"
import { quickSearchOptions } from "@/_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between">
        <Image src="/logo.png" height={18} width={120} alt="Barber" />
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex flex-col overflow-y-auto">
              <SheetTitle className="text-left">Menu</SheetTitle>

              <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
                <div className="flex items-center gap-2">
                  <Avatar className="size-11">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/18629257?v=4"/>
                  </Avatar>
                  <div>
                    <p className="font-bold">Paulo Silva</p>
                    <p className="text-xs">test@test.com</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-b border-solid py-5">
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-2"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/">
                      <HomeIcon size={18} />
                      Início
                    </Link>
                  </Button>
                </SheetClose>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href="/bookings">
                    <CalendarIcon size={18} />
                    Agendamentos
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearchOptions.map((option) => (
                  <SheetClose key={option.title} asChild>
                    <Button
                      className="justify-start gap-2"
                      variant="ghost"
                      asChild
                    >
                      <Link href={`/barbershops?service=${option.title}`}>
                        <Image
                          alt={option.title}
                          src={option.imageUrl}
                          height={18}
                          width={18}
                        />
                        {option.title}
                      </Link>
                    </Button>
                  </SheetClose>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2">
                  <LogOutIcon size={18} />
                  Sair da conta
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export { Header }
