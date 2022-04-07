import { TableService } from '@ditto/data-source';
import { addData } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';
import { ValidataErrorType } from '../@types/ErrorType';

@Injectable()
export class AddDataService {
  constructor(private _table: TableService) {}

  public async handle(tableId: number, data: any) {
    const tabel = await this._table.findById(tableId);
    const valid = this.validata(tabel, data);
    if (valid.length > 0) {
      throw valid;
    }
    // send to firebase
    if (tabel?.name) await addData(tabel.name, data);
  }

  private validata(tabel, data): ValidataErrorType[] {
    let result: ValidataErrorType[] = [];
    // Check data in field
    tabel?.fields?.map((field) => {
      if (!!!data[field.name]) {
        if (field.requrie) {
          result = [
            ...result,
            {
              code: '404',
              message: `${field.name} is requrie`,
            },
          ];
        }
      }
    });

    // Check data is not over field
    Object.keys(data).map((key) => {
      if (!!!tabel?.fields?.find((f) => f.name === key)) {
        result = [
          ...result,
          {
            code: '405',
            message: `${key} is outside`,
          },
        ];
      }
    });
    return result;
  }
}
