import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../config/custom.error";
import { PatientModel } from "../database/model/patient.model";
import { CreatePatientDto } from "./dtos/create-patient.dto";
import { PatientEntity } from "./entities/patient.entity";

export class PatientService {
    public constructor() { }


    public async create(patientDto: CreatePatientDto) {

        let personal_photo = '';

        try {

            personal_photo = await this.saveFile(patientDto.personal_photo, 'personal_photos');

            const patient = new PatientModel({
                ...patientDto,
                personal_photo: personal_photo,
            });

            
            const savedPatient = await patient.save();

            const patientEntity = PatientEntity.fromObject(savedPatient);
            
            return {
                patient: patientEntity,
            };

        } catch (error) {
            this.deleteFile(path.resolve(__dirname, '../uploads/personal_photos', personal_photo));
            throw CustomError.internalErrorServer(`${error}`);
        }
    }

    private async saveFile(file: UploadedFile, folderPath: string) {
        try {
            const fileExtension = file.mimetype.split('/').at(1);
            const destination = path.resolve(__dirname, '../uploads', folderPath);
            this.checkFolder(destination);

            const fileName = `${uuidv4()}.${fileExtension}`;

            await file.mv(destination + `/${fileName}`);

            return fileName;

        } catch (error) {
            throw CustomError.internalErrorServer(`${error}`);
        }
    };

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    private deleteFile(filePath: string) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}