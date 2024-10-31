import { Toaster } from "sonner"
import { AppRoutes } from "./routes"

export const App = () => {
  return (
    <>
    <AppRoutes />
    <Toaster richColors position="top-right"  />
    </>
  )
}
