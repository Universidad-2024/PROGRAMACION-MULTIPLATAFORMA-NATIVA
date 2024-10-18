import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().default('3000').asPortNumber(),
    NODE_ENV: get('NODE_ENV').asEnum(['development', 'production', 'test']),
    MONGO_URI: get('MONGO_URI').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
}
