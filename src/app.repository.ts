import fs from 'fs';
import { Task } from './app.entity';

const file = './db.json';

export function saveIO(tasks: Task[]) {
  try {
    fs.writeFileSync(file, JSON.stringify(tasks), {
      encoding: 'utf8',
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function readIO(): Task[] {
  try {
    fs.accessSync(file, fs.constants.R_OK);

    const tasks = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));

    return tasks;
  } catch (error) {
    return [];
  }
}
