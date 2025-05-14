"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { Form } from "./ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  search: z.string().trim().min(1),
})

const SearchInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/barbershops?search=${search}`)
  }

  return (
    <Form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Form>
  )
}

export { SearchInput }
