import { Router } from 'express';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { patientMiddleware } from '../middleware/patient.middleware';

export class PatientRoutes {

    public static get routes(): Router {
        
        const router = Router();
        const patientService = new PatientService();
        const patientController = new PatientController(patientService);

        router.get('/', patientController.findAll);
        router.get('/search', patientController.findBySearch);
        router.get('/:id', patientMiddleware.mongooseId , patientController.findOneById);
        router.post("/", patientMiddleware.create, patientController.create);
        router.put('/:id', [ patientMiddleware.mongooseId,  patientMiddleware.update ], patientController.update);
        router.delete('/:id', patientMiddleware.mongooseId, patientController.delete);

        return router;
    }
}