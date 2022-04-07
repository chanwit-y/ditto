import { getDataFilter } from '@ditto/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDataFilterService {
  public async handle(tabelName: string, filter: Map<string, any>) {
    return getDataFilter(tabelName, filter);
  }
}
