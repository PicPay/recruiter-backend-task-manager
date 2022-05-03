import { Injectable } from '@nestjs/common';
import { Task } from './app.entity';
import { readIO, saveIO } from './app.repository';

@Injectable()
export class AppService {
  private readonly db: Task[] = readIO();

  create(task: Task): Task {
    this.db.push(task);
    saveIO(this.db);

    return {
      id: this.db.length - 1,
      ...task,
    };
  }

  listAll() {
    return this.db.map((task, index) => ({ ...task, id: index }));
  }

  findOne(id: number): Task {
    return this.db[id];
  }

  update(id: number, task: Partial<Task>): Task {
    this.db[id] = {
      ...this.db[id],
      ...task,
    };

    saveIO(this.db);

    return this.db[id];
  }

  destroy(id: number): boolean {
    delete this.db[id];

    saveIO(this.db);

    return true;
  }
}
