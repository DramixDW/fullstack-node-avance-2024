import { DataSource } from "typeorm";

async function init() {
    const connection = new DataSource({
        type: 'mysql',
        port: 3306,
        host: 'localhost',
        database: 'bot-theorie',
        password: 'bot-theorie',
        username: 'bot-theorie'
    });

    await connection.initialize();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
