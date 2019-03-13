import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mainRoom: {
        type: String,
        required: true
    },
    isInside: {
        type: Boolean,
        required: true
    },
    "tagID": {
        type: String,
        required: true
    },
    "isAggressive": {
        type: Boolean,
        required: true
    },
    "conflicts": {
        type: [String],
        required: true
    },
    "authRooms": {
        type: [String],
        required: true
    },
    "DOB": {
        type: String,
        required: true
    },
    "sex": { type: String },
    "age": { type: String },
    "doctor": { type: String },
    "notes1": { type: String },
    "notes2": { type: String },
    "notes3": { type: String } 
});

module.exports = mongoose.model('Patient', CourseSchema);