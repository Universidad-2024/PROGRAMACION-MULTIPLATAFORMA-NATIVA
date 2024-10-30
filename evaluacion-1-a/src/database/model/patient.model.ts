import { Schema, model } from "mongoose";

const PatientSchema = new Schema({
    rut: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    personal_photo: {
        type: String,
    },
    admission_date: {
        type: Date,
        default: Date.now
    },
    disease: {
        type: String,
        required: true
    },
    reviewed: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
})

export const PatientModel = model('Patient', PatientSchema);