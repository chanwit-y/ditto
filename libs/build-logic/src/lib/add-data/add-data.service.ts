import { TableService } from '@ditto/data-source';
import { addData } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';
import { ValidataErrorType } from '../@types/ErrorType';
import { validate } from '../util/validate';

@Injectable()
export class AddDataService {
  constructor(private _table: TableService) {}

  public async handle(tableId: number, data: any) {
    const tabel = await this._table.findById(tableId);
    const valid = validate(tabel, data);
    if (valid.length > 0) {
      throw valid;
    }
    // send to firebase
    if (tabel?.name) await addData(tabel.name, data);
  }

}
