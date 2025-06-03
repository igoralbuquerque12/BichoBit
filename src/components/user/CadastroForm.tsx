"use client"

import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { cadastrar } from "@/lib/actions/userRegister"

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
})

type FormValues = z.infer<typeof formSchema>

export default function UserCadastroForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: ""
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setFormError(null)
    setFormSuccess(null)

    try {
      await cadastrar(data) 

      setFormSuccess("Cadastro realizado com sucesso!")
      reset()

      router.push("/")
    } catch (error) {
      setFormError("Ocorreu um erro ao processar o cadastro")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro</CardTitle>
        <CardDescription>Crie sua conta para começar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="********"
              {...register("senha")}
              aria-invalid={errors.senha ? "true" : "false"}
            />
            {errors.senha && <p className="text-sm text-red-500">{errors.senha.message}</p>}
          </div>

          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {formSuccess && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{formSuccess}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processando..." : "Cadastrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}