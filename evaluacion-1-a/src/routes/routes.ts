

import { Router } from 'express';
import { PatientRoutes } from '../patients/patient.routes';


export class AppRoutes {

    public static get routes(): Router {
        const router = Router();

        router.use('/api/patients', PatientRoutes.routes);

        return router;
    }
}