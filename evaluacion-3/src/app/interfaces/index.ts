export interface Pacientes {
    patients: Patient[];
}

export interface Paciente {
    patient: Patient
}

export interface CrearPaciente {
   rut: string;
   name: string;
    age: number;
    personal_photo: string | null;
    gender: Gender | null;
    disease: string;  
}

export interface Patient {
    _id:            string;
    rut:            string;
    name:           string;
    age:            number;
    gender:         Gender;
    personal_photo: string | null;
    disease:        string;
    reviewed:       boolean;
    admission_date: Date;
}


export enum Gender {
    Femenino = "Femenino",
    Masculino = "Masculino",
}


export interface Solito {
    patient: Patient;
}
