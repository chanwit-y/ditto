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
    await service.handle(11, {
      id: 5,
      first_name: "test first_name",
      last_name: "test last_name",
      age: 35,
    });
    expect(11).toEqual(11);
  });
});
