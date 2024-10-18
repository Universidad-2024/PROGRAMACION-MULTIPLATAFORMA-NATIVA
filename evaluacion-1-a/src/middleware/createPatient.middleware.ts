import { NextFunction, Request, Response } from "express";
import { CreatePatientDto } from "../patients/dtos/create-patient.dto";

export const patientMiddleware = {
  mongooseId: (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ error: "Parameter id is not a valid mongoose id" });
      return;
    }

    next();
  },
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
