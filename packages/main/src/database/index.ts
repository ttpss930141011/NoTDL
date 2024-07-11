import 'reflect-metadata';
import {DataSource} from 'typeorm';
import type {DataSourceOptions} from 'typeorm';
import {Task} from '/@/database/entity/Task';
import {User} from '/@/database/entity/User';
import {app} from 'electron';
import {join} from 'node:path';
import {SqlDatabase} from 'langchain/sql_db';

const options: DataSourceOptions = {
  type: 'sqlite',
  database: join(app.getAppPath(), 'packages/main/src/database/db/NoTDL.db'),
  synchronize: true,
  logging: false,
  entities: [Task, User],
  migrations: [],
  subscribers: [],
};
export const datasource = new DataSource(options);

export const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});
