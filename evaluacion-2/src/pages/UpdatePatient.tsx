import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Update } from "@/components/patient/Update";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { Patient } from "@/interface";
import { toast } from "sonner";

export const UpdatePatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState({} as Patient);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
      getPatient();
  }, []);

  const getPatient = async () => {
    try {
      const resp = await api.getOne(id!);
      setPatient(resp);
      setLoading(false);
    } catch (error) {
      toast.error('Paciente no encontrado');
      navigate('/paciente/lista');
    }
  }

    return (
        <Card className="container mx-auto">
        <CardHeader>
          <CardTitle>Actualizar Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          {
            loading ? (
              <p>Cargando...</p>
            ) : (
              <Update patient={patient} />
            )
          }
        </CardContent>
      </Card>
    )
}
