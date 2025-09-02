import express from 'express';
import { addSchool, getAllSchools, upload } from '../controller/school.controller.js';

export function SchoolRoutes(app){
    app.post("/schools", upload.single("image"), addSchool);
    app.get('/getschool', getAllSchools)
}