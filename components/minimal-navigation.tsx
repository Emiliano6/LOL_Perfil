"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Clock } from "lucide-react"

export default function MinimalNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Perfil", icon: User },
    { href: "/matches", label: "Actividad", icon: Clock },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === href
                    ? "bg-stone-900 text-white shadow-lg"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
