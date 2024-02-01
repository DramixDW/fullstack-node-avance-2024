"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
class DatabaseConnection {
    /**
     * Singleton pas fainéant (not lazy)
     */
    static getConnection() {
        if (this.databaseConnection === undefined) {
            throw new Error("La connection à la base de données doit être initialisée");
        }
        return this.databaseConnection;
    }
    /**
     * Singleton fainéant (lazy)
     */
    static async lazyGetConnection() {
        if (this.databaseConnection === undefined) {
            await this.init();
        }
        return this.databaseConnection;
    }
    /**
     * getter Alias
     */
    static get manager() {
        return this.getConnection().manager;
    }
    /**
     * Initialize moi la connection DB
     */
    static async init() {
        const connection = new typeorm_1.DataSource({
            host: 'localhost',
            port: 3306,
            database: 'bot',
            username: 'bot',
            password: 'bot',
            type: 'mysql',
            entities: ["Models/*.ts"]
        });
        await connection.initialize();
        this.databaseConnection = connection;
    }
}
exports.DatabaseConnection = DatabaseConnection;
