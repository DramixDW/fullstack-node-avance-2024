import { Router } from "express";
import { body } from "express-validator";
import { ValidationMiddleware } from "./validation-middleware";

const router = Router();

const validation = [
    body('title', 'Le titre est absent').notEmpty(),
    body('directors', 'Les réalisateurs doivent être un tableau').isArray(),
    body('is_released', 'is_release doit être booléen').isBoolean().toBoolean()
];

router.post('/movie',
    ...validation, // middleware 1 next()    |
    ValidationMiddleware, // middleware 2  <
    (req, res) => { // middleware 3            <
    const body = req.body;

    console.log(body);

    res.send("movie created");
});

export {
    router
};