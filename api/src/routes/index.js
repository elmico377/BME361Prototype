import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import patient from '../controller/patient';

let router = express();

// Connect to database.
initializeDb(db => {
    // Internal middleware.
    router.use(middleware({ config, db }));

    // API routes v1 (/v1) - TODO:
    router.use('/patients', patient({ config, db }));
});

export default router;