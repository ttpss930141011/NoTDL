import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Task} from './entity/Task';
import {app} from 'electron';
import {join} from 'node:path';
import {SqlDatabase} from 'langchain/sql_db';

export const datasource = new DataSource({
  type: 'sqlite',
  database: join(app.getAppPath(), 'packages/main/database/db/NoTDL.db'),
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});

export const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});
