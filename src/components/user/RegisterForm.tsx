"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { registerUser } from "@/lib/actions/userRegister"

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

export default function UserRegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    const { email, password } = values

    setIsLoading(true)

    try {
        await registerUser({
          email: email,
          password: password
        })


        toast.success('Conta criada com sucesso!', {
            position: "bottom-right",
            autoClose: 2000,
        })

        reset()
        
        setTimeout(() => {
            router.push('/login')
        }, 1000)
        
    } catch (error) {
        console.error("Erro ao criar conta:", error)
        toast.error('Ocorreu um erro ao criar sua conta. Tente novamente.', {
            position: "bottom-right",
            autoClose: 3000,
        })
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-orange-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-orange-600">Cadastro</CardTitle>
        <CardDescription className="text-gray-600">
          Preencha os dados abaixo para criar sua conta
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              {...register("confirmPassword")}
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : "Criar Conta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <Link 
            href="/login" 
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Faça login
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
} 