'use client'

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

type Props = {
  phone: string
}

const BarbershopContact = ({ phone }: Props) => {
  const handleCopyToClipboard = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast(phone, {
        description: 'Copiado para área de trabalho'
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <div>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleCopyToClipboard(phone)}
        >
          Copiar
        </Button>
      </div>
    </div>
  )
}

export default BarbershopContact
