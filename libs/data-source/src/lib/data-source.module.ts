import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';

@Module({
  controllers: [],
  providers: [],
  exports: [ServiceModule, PrismaModule],
  imports: [PrismaModule, ServiceModule],
})
export class DataSourceModule {}
