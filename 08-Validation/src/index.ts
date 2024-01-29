import Express from 'express';
import { router } from './router';

async function init() {
    const express = Express();

    // parse json
    express.use(Express.json());
    // router avec préfix, toutes les sous-routes auront /api/v1 devant
    express.use('/api/v1', router);

    express.listen(5555, () => {
        console.log("Listening on port 5555");
    });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
