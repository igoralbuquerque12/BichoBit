"use client"

import { login } from "@/lib/actions/userLogin"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
})

type FormValues = z.infer<typeof formSchema>

export default function UserLoginForm() {
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
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    setFormError(null)
    setFormSuccess(null)

    try {
      await login(values.email, values.password)

      toast.success('Sucesso ao realizar login', {
        position: "bottom-right",
        autoClose: 3000,
      })

      reset()
      return router.push('/')

    } catch (error) {
      toast.error('Houve um erro ao realizar o login.', {
        position: "bottom-right",
        autoClose: 3000,
      })
      console.error("Erro ao processar login:", error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-orange-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-orange-600">Login</CardTitle>
        <CardDescription className="text-gray-600">
          Entre com seus dados para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              {...register("email")}
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {formError && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {formSuccess && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{formSuccess}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}