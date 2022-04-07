import {
  DataSourceModule,
  PrismaService,
  TableService,
} from '@ditto/data-source';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataSourceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TableService],
})
export class AppModule {}
