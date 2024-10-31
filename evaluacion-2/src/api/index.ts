import { Patient, Patients } from "@/interface";

const {
    VITE_BACKEND_URL,
} = import.meta.env;

const api_url = `${VITE_BACKEND_URL}/patients`;

interface Api {
    get: () => Promise<Patients>;
    getOne: (id: string) => Promise<Patient>;
    create: (data: any) => Promise<Patient>;
    update: (id: string, data: any) => Promise<Patient>;
}


export const api:Api = {
    get: async () => {
        const response = await fetch(api_url);
        return response.json()
    },
    getOne: async (id: string) => {
        const response = await fetch(`${api_url}/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener paciente');
        }

        const data = await response.json() as { patient: Patient };

        return data.patient;
    },
    create: async (data: any) => {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json()
    },
    update: async (id: string, data: any) => {
        const response = await fetch(`${api_url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json()
    },
}