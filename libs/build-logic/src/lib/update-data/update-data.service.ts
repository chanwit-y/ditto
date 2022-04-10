import { TableService } from "@ditto/data-source";
import { updateData } from "@ditto/firebase";
import { Injectable } from "@nestjs/common";
import { ValidataErrorType } from "../@types/ErrorType";
import { validate } from "../util/validate";

@Injectable()
export class UpdateDataService {
  constructor(private _table: TableService) {}

  public async handle(tableId: number, id: string, data: any) {
    const tabel = await this._table.findById(tableId);
    const valid = validate(tabel, data);
    if (valid.length > 0) {
      throw valid;
    }
    // send to firebase
    if (tabel?.name) {
      let field = "";
      let value: unknown = undefined;
      let moreFieldsAndValues: unknown[] = [];

      //trasform data to parameter
      Object.entries(data).map(([k, v], index) => {
        if (index === 0) {
          field = k;
          value = v;
        } else {
          moreFieldsAndValues = [...moreFieldsAndValues, k, v];
        }
      });
      await updateData(tabel.name, id, field, value, ...moreFieldsAndValues);
    }
  }

//   private validate(tabel, data): ValidataErrorType[] {
//     let result: ValidataErrorType[] = [];
//     // Check data in field
//     tabel?.fields?.map((field) => {
//       if (!!!data[field.name]) {
//         if (field.requrie) {
//           result = [
//             ...result,
//             {
//               code: "401",
//               message: `${field.name} is requrie`,
//             },
//           ];
//         }
//       }
//     });

//     // Check data is not over field
//     Object.keys(data).map((key) => {
//       if (!!!tabel?.fields?.find((f) => f.name === key)) {
//         result = [
//           ...result,
//           {
//             code: "405",
//             message: `${key} is outside`,
//           },
//         ];
//       }
//     });
//     return result;
//   }
}
