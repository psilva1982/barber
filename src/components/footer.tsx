import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none p-5">
        <CardContent>
          <p className="text-sm text-gray-500">
            2025 Copyright - <span className="font-semibold">Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export { Footer }
