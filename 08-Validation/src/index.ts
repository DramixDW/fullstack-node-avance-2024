import Express from 'express';
import { body } from 'express-validator';
import { ValidationMiddleware } from './validation-middleware';

const validation = [
    body('title', 'Le titre est absent').notEmpty(),
    body('directors', 'Les réalisateurs doivent être un tableau').isArray(),
    body('is_released', 'is_release doit être booléen').isBoolean().toBoolean()
];

async function init() {
    const express = Express();

    // parse json
    express.use(Express.json());

    express.post('/movie',
        ...validation, // middleware 1 next()    |
        ValidationMiddleware, // middleware 2  <
    (req, res) => { // middleware 3            <
        const body = req.body;

        console.log(body);

        res.send("movie created");
    });

    express.listen(5555, () => {
        console.log("Listening on port 5555");
    });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
