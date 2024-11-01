import { Patient } from "@/interface";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, UserRoundPen } from "lucide-react";

interface Props {
    patients: Patient[];
    loading: boolean;
}

const columns = [
    { name: 'Foto' },
    { name: 'Nombre' },
    { name: 'Acciones' }
]

export const List = ({ patients, loading }: Props) => {
    return (
        <Table className="bg-white">
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
                                        <Link to={`/paciente/detalle/${patient._id}`}>
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
    )
}
