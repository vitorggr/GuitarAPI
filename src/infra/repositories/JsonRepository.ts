import { promises as fs } from 'fs';

export class JsonRepository<T> {
  constructor(private filePath: string) {}

  async getAll(): Promise<T[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as T[];
  }

  async saveAll(items: T[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
  }
}
