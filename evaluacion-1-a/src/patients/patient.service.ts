import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../config/custom.error";
import { PatientModel } from "../database/model/patient.model";
import { CreatePatientDto } from "./dtos/create-patient.dto";
import { UpdatePatientDto } from "./dtos/update-patient.dto";
import { FolderPath } from "../interfaces";

export class PatientService {
  public constructor() {}

  public async findAll() {
    const patients = await PatientModel.find();

    return {
      patients: patients,
    };
  }

  public async findOneById(id: string) {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      throw CustomError.notFound("Patient not found");
    }

    return {
      patient: patient,
    };
  }

  public async findBySearch(search: string | Date) {
    if (!search) {
      throw CustomError.badRequest("Search parameter is required");
    }

    const isDate = !isNaN(new Date(search).getTime());
    const isAge = !isNaN(parseInt(search.toString()));
    const patients = await PatientModel.find({
      $or: [
        { admission_date: isDate ? new Date(search) : undefined },
        { name : { $regex: search, $options: "i" } },
        { age: isAge ? parseInt(search.toString()) : undefined },
        { disease: { $regex: search, $options: "i" } },
        { gender: { $regex: search, $options: "i" } },
      ],
    });

    return patients;
  }

  public async create(patientDto: CreatePatientDto) {
    let personal_photo = null;

    try {
      if (patientDto.personal_photo) {
        personal_photo = await this.saveFile(
          patientDto.personal_photo,
          FolderPath.PERSONAL_PHOTOS
        );
      }

      const patient = new PatientModel({
        ...patientDto,
        personal_photo: personal_photo,
      });

      const savedPatient = await patient.save();

      return {
        patient: savedPatient,
      };
    } catch (error) {
      if (personal_photo) {
        this.deleteFile({
          fileName: personal_photo,
          folderPath: FolderPath.PERSONAL_PHOTOS,
        });
      }
      throw CustomError.internalErrorServer(`${error}`);
    }
  }

  public async update(id: string, patientDto: UpdatePatientDto) {
    let personal_photo = null;

    const data = await this.findOneById(id);

    if (!!patientDto.personal_photo && !!data.patient.personal_photo) {
      this.deleteFile({
        fileName: data.patient.personal_photo,
        folderPath: FolderPath.PERSONAL_PHOTOS,
      });
    }

    if (patientDto.personal_photo) {
      personal_photo = await this.saveFile(
        patientDto.personal_photo,
        FolderPath.PERSONAL_PHOTOS
      );
    }

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      { ...patientDto, personal_photo: personal_photo || data.patient.personal_photo },
      { new: true }
    );

    if (!updatedPatient) {
      throw CustomError.notFound("Patient not found");
    }

    return {
      patient: updatedPatient,
    };
  }

  public async delete(id: string) {
    const patient = await PatientModel.findByIdAndUpdate(id, { reviewed: true });

    if (!patient) {
      throw CustomError.notFound("Patient not found");
    }

    return {
      message: `Patient with id ${id} deleted successfully`,
    }
  }

  private async saveFile(file: UploadedFile, folderPath: FolderPath) {
    try {
      const fileExtension = file.mimetype.split("/").at(1);
      this.checkFolder({ folderPath: FolderPath.PERSONAL_PHOTOS });

      const fileName = `${uuidv4()}.${fileExtension}`;

      await file.mv(
        path.resolve(__dirname, `../uploads/${folderPath}`, fileName)
      );

      return fileName;
    } catch (error) {
      throw CustomError.internalErrorServer(`${error}`);
    }
  }

  private checkFolder({ folderPath }: { folderPath: FolderPath }) {
    if (!fs.existsSync(path.resolve(__dirname, `../uploads/${folderPath}`))) {
      fs.mkdirSync(path.resolve(__dirname, `../uploads/${folderPath}`));
    }
  }

  private deleteFile({
    folderPath,
    fileName,
  }: {
    folderPath: FolderPath;
    fileName: string;
  }) {
    if (
      fs.existsSync(
        path.resolve(__dirname, `../uploads/${folderPath}`, fileName)
      )
    ) {
      fs.unlinkSync(
        path.resolve(__dirname, `../uploads/${folderPath}`, fileName)
      );
    }
  }
}
