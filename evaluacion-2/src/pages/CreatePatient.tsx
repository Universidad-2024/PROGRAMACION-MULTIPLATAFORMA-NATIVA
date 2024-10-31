
import { Create } from "@/components/patient/Create"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const CreatePatient = () => {
  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Agregar Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Create />
      </CardContent>
    </Card>
  )
}
