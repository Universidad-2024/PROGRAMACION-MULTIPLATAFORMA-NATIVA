import { NextFunction, Request, Response } from "express";
import { CreatePatientDto } from "../patients/dtos/create-patient.dto";
import { CustomError } from "../config/custom.error";
import { Gender } from "../interfaces";

export const patientMiddleware = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const [error, patientDto] = CreatePatientDto.create({
        ...req.body,
        personal_photo: req.files?.personal_photo,
    });

    if (error) {
        res.status(400).json({ error });
        return;
    };

    req.body = patientDto;
    next();

  },
};
