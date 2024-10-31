import { Gender } from "@/components/patient/Create";

export interface Patients {
    patients: Patient[];
}

export interface Patient {
    _id:            string;
    rut:            string;
    name:           string;
    age:            number;
    gender:         Gender;
    personal_photo: null;
    disease:        string;
    reviewed:       boolean;
    admission_date: Date;
}
