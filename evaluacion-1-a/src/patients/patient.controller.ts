import { Request, Response } from "express";
import { PatientService } from "./patient.service";
import { CustomError } from "../config/custom.error";
import { CreatePatientDto } from "./dtos/create-patient.dto";

export class PatientController {

    public constructor(
        private readonly patientService: PatientService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        return res.status(500).json({ error: "Internal server error" });
      };
      
    public createPatient = (req: Request, res: Response) => {
        const file = req.files;

        const [error, patientDto] = CreatePatientDto.create({
            ...req.body,
            personal_photo: file?.personal_photo,
        });
        
        if (error) return res.status(400).json({ error });

        this.patientService.create(patientDto!).then((patient) => res.status(201).json(patient)).catch((error) => this.handleError(error, res));
    };
}