import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { CreatePatient, Home, PatientDetails, PatientList, PatientSearch, UpdatePatient } from "../pages";
import { MainLayout } from "@/layouts";
import { Error } from "@/components/error";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/inicio" element={<Home />} />
                    <Route path="/paciente/nuevo" element={<CreatePatient />} />
                    <Route path="/paciente/actualizar/:id" element={<UpdatePatient />} />
                    <Route path="/paciente/detalle/:id" element={<PatientDetails />} />
                    <Route path="/paciente/lista" element={<PatientList />} />
                    <Route path="/paciente/buscar/:search" element={<PatientSearch />} />
                    <Route path="*" element={<Error message="Página no encontrada" redirect="/inicio" status={404} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
