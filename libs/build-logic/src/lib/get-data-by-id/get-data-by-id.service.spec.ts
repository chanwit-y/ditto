import { Test, TestingModule } from '@nestjs/testing';
import { GetDataByIdService } from './get-data-by-id.service';

describe('GetDataByIdService', () => {
  let service: GetDataByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDataByIdService],
      imports: [],
    }).compile();

    service = module.get<GetDataByIdService>(GetDataByIdService);
  });

  it('get data by id', async () => {
    const data = await service.handle('UserProfile', 'user_12345');
    expect(data?.id ?? "").toEqual(1);
  });
});
