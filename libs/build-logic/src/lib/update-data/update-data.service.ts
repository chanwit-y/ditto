import { TableService } from '@ditto/data-source';
import { updateData } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';
import { ValidataErrorType } from '../@types/ErrorType';

@Injectable()
export class UpdateDataService {
  constructor(private _table: TableService) {}

  public async handle(tableId: number, id: string, data: any) {
    const tabel = await this._table.findById(tableId);
    const valid = this.validata(tabel, data);
    if (valid.length > 0) {
      throw valid;
    }
    // send to firebase
    if (tabel?.name) await updateData(tabel.name, id, data);
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
              code: '401',
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
