import Express from 'express';

async function init() {
    const express = Express();

    // parse json
    express.use(Express.json());

    express.post('/movie', (req, res) => {
        const body = req.body;

        console.log(body);
    });

    express.listen(5555, () => {
        console.log("Listening on port 5555");
    });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
