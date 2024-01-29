import Express from 'express';
import { body, validationResult } from 'express-validator';

async function init() {
    const express = Express();

    // parse json
    express.use(Express.json());

    express.post('/movie', 
        body('title').notEmpty()
    , (req, res) => {
        const result = validationResult(req);

        const errors = result.array();

        if (errors.length) {
            // bad request
            res.status(400);
            return res.send({
                errors
            });
        }

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
