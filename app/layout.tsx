import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import MinimalNavigation from "@/components/minimal-navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "emo",
  viewport: "width=device-width, initial-scale=1",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <MinimalNavigation />
        {children}
      </body>
    </html>
  )
}
