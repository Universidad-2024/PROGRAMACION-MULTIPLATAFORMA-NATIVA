import { Router } from 'express';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

export class PatientRoutes {

    public static get routes(): Router {
        
        const router = Router();
        const patientService = new PatientService();
        const controller = new PatientController(patientService);

        // router.get('/');
        // router.get('/search');
        // router.get('/:id');
        router.post('/', controller.createPatient);
        // router.put('/:id');
        // router.delete('/:id');

        return router; // Add this line to return the router
    }
}