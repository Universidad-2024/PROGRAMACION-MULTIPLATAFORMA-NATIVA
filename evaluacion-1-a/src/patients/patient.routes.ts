import { Router } from 'express';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { patientMiddleware } from '../middleware/createPatient.middleware';

export class PatientRoutes {

    public static get routes(): Router {
        
        const router = Router();
        const patientService = new PatientService();
        const patientController = new PatientController(patientService);

        router.get('/', patientController.findAll);
        // router.get('/search');
        router.get('/:id', patientMiddleware.mongooseId , patientController.findOneById);
        router.post("/", patientMiddleware.create, patientController.create);
        // router.put('/:id');
        // router.delete('/:id');

        return router; // Add this line to return the router
    }
}