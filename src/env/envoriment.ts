import * as dotenv from 'dotenv';

dotenv.config();

export const appPort = process.env.APP_PORT || 3000;
export const dbUrl = process.env.DATABASE_URL || '';
export const jwtSecret = process.env.JWT_SECRET;
export const passwordSecret = process.env.PASSWORD_SECRET;
