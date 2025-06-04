import UserRegisterForm from "@/components/user/RegisterForm"
import { PawPrint } from "lucide-react"

export default function CadastroPagina() {
    return (
        <div className="flex flex-col items-center justify-center from-orange-50 to-white ">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <PawPrint className="h-12 w-12 text-orange-500" />
                    </div>
                </div>
                <UserRegisterForm />
            </div>
        </div>
    )
}