import { DataSourceModule } from "@ditto/data-source";
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateDataService } from "./update-data.service";

describe("UpdateDataService", () => {
  let service: UpdateDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateDataService],
      imports: [DataSourceModule],
    }).compile();

    service = module.get<UpdateDataService>(UpdateDataService);
  });

  it("update", async () => {
    await service.handle(11, "uuftrCTOEmxDJ5MtWmqQ", {
      id: 1,
      first_name: "update chanwit 1111",
      last_name: "update yimneam 2222",
      age: 35,
    });
    expect(11).toEqual(11);
  });
});
