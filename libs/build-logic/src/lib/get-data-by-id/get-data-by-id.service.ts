import { getDataById } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDataByIdService {
  public async handle(tabelName: string, id: string) {
    return getDataById(tabelName, id);
  }
}
