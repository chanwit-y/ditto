import { Test, TestingModule } from '@nestjs/testing';
import { GetDataFilterService } from './get-data-filter.service';

describe('GetDataFilterService', () => {
  let service: GetDataFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDataFilterService],
    }).compile();

    service = module.get<GetDataFilterService>(GetDataFilterService);
  });

  it('should be have one', async () => {
    const filter: Map<string, any> = new Map<string, any>();
    filter.set('first_name', 'chanwit');
    filter.set('id', 1);
    const data = await service.handle('UserProfile', filter);
    console.log(data);
    expect(data.length).toBeGreaterThan(0);
  });
});
