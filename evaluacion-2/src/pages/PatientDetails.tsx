import { api } from "@/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Patient } from "@/interface";
import { Activity, Calendar, CheckCircle, ClipboardEdit, Eye, IdCard, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { RiGenderlessLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Delete } from '../components/patient/Delete';

const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Usa 'true' si prefieres el formato de 12 horas
    });
};

export const PatientDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState({} as Patient);

    useEffect(() => {
        getPatient();
    }, []);

    const getPatient = async () => {
        try {
            const resp = await api.getOne(id!);
            setPatient(resp);
        } catch (error) {
            toast.error('Paciente no encontrado');
            navigate('/paciente/lista');
        }
    }

    return (
        <Card className="container mx-auto">
            <CardHeader className="bg-primary">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-white">Detalles del Paciente</h1>
                    <div className="space-x-2">
                        <Link to={`/paciente/actualizar/${id}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors"
                        >
                            <ClipboardEdit className="w-4 h-4 mr-2" />
                            Editar
                        </Link>
                        <Delete id={patient._id} name={patient.name}>
                        <button
                            disabled={patient.reviewed}
                            className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Revisado
                        </button>
                        </Delete>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">

                <InfoDisplay IconComponent={IdCard} title="Rut" value={patient.rut} />

                <InfoDisplay IconComponent={User} title="Nombre" value={patient.name} />

                <InfoDisplay IconComponent={Calendar} title="Edad" value={patient.age} />

                <InfoDisplay IconComponent={RiGenderlessLine} title="Sexo" value={patient.gender} />

                <InfoDisplay IconComponent={Activity} title="Enfermedad" value={patient.disease} />

                <InfoDisplay IconComponent={Eye} title="Revisado" value={patient.reviewed ? 'Si' : 'No'} />

            </CardContent>
            <CardFooter className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-gray-500">Fecha de Ingreso</p>
                    <p className="text-sm font-medium text-blue-600">{formatDateTime(patient.admission_date)}</p>
                </div>
            </CardFooter>
        </Card>
    )
}


const InfoDisplay = ({ IconComponent, title, value }: {
    IconComponent: any,
    title: string,
    value: string | number
}) => {

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-lg font-semibold">{value}</p>
                </div>
            </div>
        </div>
    )
}
