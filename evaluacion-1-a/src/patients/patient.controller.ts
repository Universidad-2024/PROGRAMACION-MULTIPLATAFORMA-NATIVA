import { Request, Response } from "express";
import { PatientService } from "./patient.service";
import { CustomError } from "../config/custom.error";

export class PatientController {
  public constructor(private readonly patientService: PatientService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  public findOneById = (req: Request, res: Response) => {
    this.patientService
      .findOneById(req.params.id)
      .then((patient) => res.status(200).json(patient))
      .catch((error) => this.handleError(error, res));
  }

  public findBySearch = (req: Request, res: Response) => {
    this.patientService
      .findBySearch(req.query.search as string)
      .then((patients) => res.status(200).json(patients))
      .catch((error) => this.handleError(error, res));
  }

  public findAll = (req: Request, res: Response) => {
    this.patientService
      .findAll()
      .then((patients) => res.status(200).json(patients))
      .catch((error) => this.handleError(error, res));
  }

  public create = (req: Request, res: Response) => {
    this.patientService
      .create({
        ...req.body,
        ...req?.files
      })
      .then((patient) => res.status(201).json(patient))
      .catch((error) => this.handleError(error, res));
  };

  public update = (req: Request, res: Response) => {
    this.patientService
      .update(req.params.id, {
        ...req.body,
        ...req?.files
      })
      .then((patient) => res.status(200).json(patient))
      .catch((error) => this.handleError(error, res));
  };

  public delete = (req: Request, res: Response) => {
    this.patientService
      .delete(req.params.id)
      .then((resp) => res.status(200).json(resp))
      .catch((error) => this.handleError(error, res));
  };
}
