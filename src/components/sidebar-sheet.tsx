import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HomeIcon, CalendarIcon, LogOutIcon, } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";

const SidebarSheet = () => {

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 border-b border-solid ps-4 pb-5">
                <div className="flex items-center gap-2">
                    <Avatar className="size-11">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/18629257?v=4" className="rounded-full"/>
                    </Avatar>
                    <div>
                        <p className="font-bold">Paulo Silva</p>
                        <p className="text-xs">test@test.com</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid pb-5">
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

            <div className="flex flex-col gap-2 border-b border-solid pb-5">
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
                                    aria-description={option.title}
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

        </SheetContent>
    );
}

export default SidebarSheet;