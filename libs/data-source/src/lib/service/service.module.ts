import { TabelService } from './tabel/tabel.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaService, TabelService],
  imports: [PrismaClient],
  exports: [TabelService],
})
export class ServiceModule {}
