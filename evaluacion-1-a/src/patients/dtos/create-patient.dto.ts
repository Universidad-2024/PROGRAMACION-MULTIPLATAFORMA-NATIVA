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

        const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
        if (personal_photo) {
            const extension = personal_photo?.mimetype.split('/')[1];
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
            if (!imageExtensions.includes(extension)) return ['personal_photo is invalid format, must be jpg, jpeg, png, gif, bmp, webp'];
        }
        
        if (!rut) return ['rut is required'];
        if (!rutRegex.test(rut)) return ['rut is invalid format XXXXXXXX-X']; 
        if (!name) return ['name is required'];
        if (name.length < 3) return ['name is invalid, must be at least 3 characters'];
        if (!age) return ['age is required'];
        if (age < 0) return ['age is invalid, must be greater than 0'];
        if (!gender) return ['gender is required'];
        if (!Object.values(Gender).includes(gender)) return ['gender is invalid, must be Masculino or Femenino'];
        // if (!personal_photo) return ['File personal_photo is required'];
        if (!disease) return ['disease is required'];
        if (disease.length < 3) return ['disease is invalid, must be at least 3 characters'];


        return [undefined, new CreatePatientDto(rut, name, age, gender, personal_photo, disease)];
    }
}