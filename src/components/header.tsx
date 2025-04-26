import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between">
        <Image src="/logo.png" height={18} width={120} alt="Barber" />
        <Button size={"icon"} variant={"outline"}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export { Header }
