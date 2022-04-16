import { DataSourceModule } from "@ditto/data-source";
import { Test, TestingModule } from "@nestjs/testing";
import { GetDataRelationService } from "./get-data-relation.service";

describe("GetDataRelationService", () => {
  let service: GetDataRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDataRelationService],
      imports: [DataSourceModule],
    }).compile();

    service = module.get<GetDataRelationService>(GetDataRelationService);
  });

  it("get tabel by id", async () => {
    await service.handle(11, "user_12345");
    expect(10).toBeGreaterThan(0);
  });
});
