import { CustomError } from "../../config/custom.error";
import { Gender } from "../../interfaces";

export class PatientEntity {
    public constructor(
        public readonly id: string,
        public readonly rut: string,
        public readonly name: string,
        public readonly age: number,
        public readonly gender: Gender,
        public readonly personal_photo: string,
        public readonly admission_date: Date,
        public readonly disease: string,
        public readonly reviewed: boolean,
    ) {}

    public static fromObject(object: Record<string, any>) {
        const { _id, rut, name, age, gender, personal_photo, admission_date, disease,reviewed }  = object;

        if (!_id) throw CustomError.badRequest('id is required');
        if (!rut) throw CustomError.badRequest('rut is required');
        if (!name) throw CustomError.badRequest('name is required');
        if (!age) throw CustomError.badRequest('age is required');
        if (!Object.values(Gender).includes(gender)) throw CustomError.badRequest('gender is invalid, must be Masculino or Femenino');
        if (!personal_photo) throw CustomError.badRequest('personal_photo is required');
        if (!admission_date) throw CustomError.badRequest('admission_date is required');
        if (!disease) throw CustomError.badRequest('disease is required');
        if (reviewed === undefined) throw CustomError.badRequest('reviewed is required');

        return new PatientEntity(
            _id,
            rut,
            name,
            age,
            gender,
            personal_photo,
            admission_date,
            disease,
            reviewed,
        )
    }
}