import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';
import { UserEntity } from './src/user/entities/user.entity';
dotenv.config();

export const OrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};
const datasource = new DataSource(OrmConfig);
export default datasource;
