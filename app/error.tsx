"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <Button onClick={reset}>Intentar de nuevo</Button>
        </div>
      </div>
    </div>
  )
}
