import { DataSourceModule, TableService } from '@ditto/data-source';
import { Module } from '@nestjs/common';
import { AddDataService } from './add-data/add-data.service';
import { GetDataAllService } from './get-data-all/get-data-all.service';

@Module({
  imports: [DataSourceModule],
  providers: [AddDataService, GetDataAllService],
  exports: [AddDataService, GetDataAllService],
})
export class BuildLogicModule {}
