import { ServiceModule } from './../service.module';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, Tabel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { TabelService } from './tabel.service';

// const tabels: Tabel[] = [
//   {
//     id: 1,
//     name: 'User',
//     description: '',
//   },
// ];

describe('TableService', () => {
  let service: TabelService;

  // let mockCtx: MockContext;
  // let ctx: Context;

  beforeEach(async () => {
    // mockCtx = createMockContext();
    // ctx = mockCtx as unknown as Context;

    // mockCtx.prisma.tabel.findMany.mockResolvedValue([...tabels]);
    // mockCtx.prisma.tabel.create.mockResolvedValue(tabels[0]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [TabelService, PrismaService, PrismaClient],
      imports: [ServiceModule],
    })
      // .overrideProvider(PrismaClient)
      // .useValue(ctx.prisma)
      .compile();

    service = module.get<TabelService>(TabelService);
    // service = await module.resolve(TableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get table should be greater then one', async () => {
    const table = await service.findAll();
    console.table(table);
    expect(table.length).toBeGreaterThanOrEqual(0);
  });

  it('get table by id name should be "Test"', async () => {
    const tabel = await service.findById(1);
    expect(tabel?.name).toEqual('Test');
  });

  it('count row', async () => {
    const count = await service.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('create table should be data not null', async () => {
    const table: Partial<Tabel> = {
      name: 'Test',
      description: '',
    };
    const result = await service.create(table);
    expect(result.name).toEqual(table.name);
  });

  it('update table should be change name', async () => {
    const table: Tabel = {
      id: 1,
      name: 'Test',
      description: '',
    };
    const result = await service.update(table);
    expect(result.name).toEqual(table.name);
  });
});
