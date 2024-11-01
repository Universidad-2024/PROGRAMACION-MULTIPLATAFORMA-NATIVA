import { api } from "@/api";
import { List } from "@/components/patient/List";
import { Patient } from "@/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const PatientSearch = () => {
  const { search } = useParams();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    setLoading(true);
    if (!search) return;
    const data = await api.search(search);
    setPatients(data);
    setLoading(false); 
  }

  useEffect(() => {
    handleSearch();
  }, [search])

  return (
    <>
      {
        (patients.length === 0) ? (
          <div className="container mx-auto w-full bg-white shadow">
            <h1 className="text-2xl font-semibold p-7">No se encontraron pacientes</h1>
          </div>
        ) : (
          <List patients={patients} loading={loading} />
        )
      }
    </>
  )
}
