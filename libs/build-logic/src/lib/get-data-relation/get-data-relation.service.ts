import { getDataById } from "@ditto/firebase";
import { Injectable } from "@nestjs/common";
import { TabelService } from "libs/data-source/src/lib/service/tabel/tabel.service";

@Injectable()
export class GetDataRelationService {
  constructor(private _tabelService: TabelService) {}

  public async handle(tabelId: number, id: string) {
    let result: any;
    const tabel = await this._tabelService.findById(tabelId);
    const dataMainTabel = await getDataById(tabel?.name ?? "", id);

    result = dataMainTabel;

    for (const tr of tabel?.TabelOnRelation ?? []) {
      const corssId = dataMainTabel
        ? dataMainTabel[tr?.crossFieldName ?? ""]
        : "";
      const crossTabel = await this._tabelService.findById(tr.crossId);
      const dataCrossTabel = await getDataById(crossTabel?.name ?? "", corssId);
      result = { ...result, [crossTabel?.name?.toLowerCase() ?? ""]: dataCrossTabel };
    }

    console.log(result);

    return result;
  }
}
