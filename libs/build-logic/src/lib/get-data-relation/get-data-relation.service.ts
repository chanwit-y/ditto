import { getDataById } from "@ditto/firebase";
import { Injectable } from "@nestjs/common";
import { TabelService } from "libs/data-source/src/lib/service/tabel/tabel.service";

@Injectable()
export class GetDataRelationService {
  constructor(private _tabelService: TabelService) {}

  public async handle(tabelId: number, id: string) {
    const tabel = await this._tabelService.findById(tabelId);

    const dataMainTabel = await getDataById(tabel?.name ?? "", id);

    console.log(dataMainTabel);
    // console.log(dataMainTabel && dataMainTabel["position_id"]);
  
    const corssId = dataMainTabel ? dataMainTabel["position_id"] : "";

    for (const tr of tabel?.TabelOnRelation ?? []) {
      const crossTabel = await this._tabelService.findById(tr.crossId);
      const dataCrossTabel = await getDataById(crossTabel?.name ?? "", corssId);

      console.log(dataCrossTabel);
    }

    // console.log(tabel?.name);
    // console.log(id);
  }
}
