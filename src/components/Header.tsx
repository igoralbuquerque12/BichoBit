"use client"

import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout realizado")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-orange-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-orange-600 hover:bg-orange-50" />
        <h2 className="text-lg font-semibold text-gray-800">Sistema de Gestão - Petshop</h2>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-orange-600 hover:bg-orange-50">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Fazer Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
