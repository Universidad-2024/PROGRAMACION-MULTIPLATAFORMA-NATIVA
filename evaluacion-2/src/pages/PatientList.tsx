import { api } from "@/api"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Patient } from "@/interface"
import { Eye, UserRoundPen } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const columns = [
  { name: 'Foto' },
  { name: 'Nombre' },
  { name: 'Acciones' }
]

export const PatientList = () => {

  const [patients, setPatients] = useState([] as Patient[]);
  const [loading, setLoading] = useState(true);

  const getPatients = async () => {
    const resp = await api.get();
    setPatients(resp.patients);
    setLoading(false);
  }

  useEffect(() => {
    getPatients();
  }, [])

  return (
    <div className="container mx-auto w-full bg-white shadow">

      <h1 className="text-2xl font-semibold p-7">Lista de Pacientes</h1>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.name}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">Cargando...</TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>
                    <img src={patient.personal_photo || 'https://via.placeholder.com/150'} alt={patient.name} className="w-12 h-12 rounded-full" />
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button asChild variant="ghost" size="icon" title="Ver">
                      <Link to={`/patients/${patient._id}`}>
                        <Eye />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" title="Editar">
                      <Link to={`/paciente/actualizar/${patient._id}`}>
                        <UserRoundPen />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>

  )
}

