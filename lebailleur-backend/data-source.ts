// Create this file: src/data-source.ts or data-source.ts (at root)
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME || 'lebailleur_user',
  password: process.env.DB_PASSWORD || 'lebailleur_password',
  database: process.env.DB_NAME || 'lebailleur_db',
  synchronize: true,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'], // ← Migration location
  subscribers: ['src/**/*.subscriber.ts'],
});