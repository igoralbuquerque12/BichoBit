import UserLoginForm from "@/components/user/LoginForm"
import { PawPrint } from "lucide-react"

export default function LoginPagina() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-centerfrom-orange-50 to-white p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Bem-vindo ao BichoBit
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Seu sistema de gestão pet de confiança
                    </p>
                </div>
                <UserLoginForm />
            </div>
        </div>
    )
}