import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const nodeEnvironment = process.env.NODE_ENV;
let connectionString;

switch (nodeEnvironment) {
case 'test':
    connectionString = process.env.TEST_DB_URL;
    break;
case 'development':
    connectionString = process.env.DEV_DB_URL;
    break;
default:
    connectionString = process.env.DATABASE_URL;
    break;
}

const pool = new Pool({
    connectionString
});


const db = {
    query: (text, params, callback) => pool.query(text, params, callback),
    connect: () => pool.connect()
};

export default db;
