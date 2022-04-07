import { TableService } from '@ditto/data-source';
import { Injectable, Scope } from '@nestjs/common';
import { Tabel } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(private _table: TableService) {}

  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async getTable(): Promise<Tabel[]> {
    return await this._table.findAll();
  }
}
