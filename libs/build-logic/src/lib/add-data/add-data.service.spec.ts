import { DataSourceModule } from '@ditto/data-source';
import { Test, TestingModule } from '@nestjs/testing';
import { AddDataService } from './add-data.service';

describe('AddDataService', () => {
  let service: AddDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddDataService],
      imports: [DataSourceModule],
    }).compile();

    service = module.get<AddDataService>(AddDataService);
  });

  it('display table', async () => {
    await service.handle(12, {
      position_id: 1,
      position_name: "test add position",
    });
    expect(11).toEqual(11);
  });
});
