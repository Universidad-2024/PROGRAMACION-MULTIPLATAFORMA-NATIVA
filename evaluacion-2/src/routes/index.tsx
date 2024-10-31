import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { CreatePatient, Home, PatientList, UpdatePatient } from "../pages";
import { MainLayout } from "@/layouts";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/paciente/nuevo" element={<CreatePatient />} />
                    <Route path="/paciente/lista" element={<PatientList />} />
                    <Route path="/paciente/actualizar/:id" element={<UpdatePatient />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
