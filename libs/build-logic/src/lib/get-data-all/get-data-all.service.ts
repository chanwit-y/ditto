import { getDataAll } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDataAllService {
  public async handle(tabelName: string) {
    return getDataAll(tabelName);
  }
}
