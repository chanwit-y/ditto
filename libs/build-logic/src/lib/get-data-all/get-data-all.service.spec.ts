import { Test, TestingModule } from '@nestjs/testing';
import { GetDataAllService } from './get-data-all.service';

describe('GetDataAllService', () => {
  let service: GetDataAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDataAllService],
      imports: [],
    }).compile();

    service = module.get<GetDataAllService>(GetDataAllService);
  });

  it('get doc data all', async () => {
    const data = await service.handle('UserProfile');
    console.log(data);
    
    expect(service).toBeDefined();
  });
});
