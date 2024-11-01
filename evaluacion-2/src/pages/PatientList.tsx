import { api } from "@/api"
import { List } from "@/components/patient/List"
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

      <List patients={patients} loading={loading} />

    </div>

  )
}

