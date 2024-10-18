import { UploadedFile } from "express-fileupload";
import { Gender } from "../../interfaces";

export class CreatePatientDto {
    private constructor(
        public rut: string,
        public name: string,
        public age: number,
        public gender: Gender,
        public personal_photo: UploadedFile,
        public disease: string
    ) {}

    public static create(object: CreatePatientDto): [string?, CreatePatientDto?] {
        const { rut, name, age, gender, personal_photo, disease } = object;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
        const extension = personal_photo.mimetype.split('/')[1];
        
        if (!rut) return ['rut is required'];
        if (!rutRegex.test(rut)) return ['rut is invalid format XXXXXXXX-X']; 
        if (!name) return ['name is required'];
        if (!age) return ['age is required'];
        if (!gender) return ['gender is required'];
        if (!Object.values(Gender).includes(gender)) return ['gender is invalid, must be Masculino or Femenino'];
        if (!personal_photo) return ['File personal_photo is required'];
        if (!imageExtensions.includes(extension)) return ['personal_photo must be an image'];
        if (!disease) return ['disease is required'];


        return [undefined, new CreatePatientDto(rut, name, age, gender, personal_photo, disease)];
    }
}