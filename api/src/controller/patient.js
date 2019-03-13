import mongoose from 'mongoose';
import { Router } from 'express';
import Patient from '../model/patient';

export default({ config, db }) => {

    let api = Router();

    /// '/v1/patient/add'
    /// POST operation for creating a new patient
    api.post('/add', (req, res) => {
        let newPatient = new Patient();
        newPatient.name = req.body.name;
        newPatient.mainRoom = req.body.mainRoom;
        newPatient.isInside = req.body.isInside;
        newPatient.tagID = req.body.tagID;
        newPatient.isAggressive = req.body.isAggressive;
        newPatient.conflicts = req.body.conflicts;
        newPatient.authRooms = req.body.authRooms;
        newPatient.DOB = req.body.DOB;
        newPatient.sex = req.body.sex;
        newPatient.age = req.body.age;
        newPatient.doctor = req.body.doctor;
        newPatient.notes1 = req.body.notes1;
        newPatient.notes2 = req.body.notes2;
        newPatient.notes3 = req.body.notes3;
        newPatient.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Patient saved successfully.' });
        });
    });

    /// '/v1/course'
    /// GET operation for reading all patients
    api.get('/', (req, res) => {
        // Get everything.
        Patient.find({}, (err, patients) => {
            if (err) {
                res.send(err);
            }
            res.json(patients);
        });
    });

    return api;

}