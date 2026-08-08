import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { MongooseModule } from "@nestjs/mongoose";

describe("Database Connection", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should compile the application", async () => {
    expect(app).toBeDefined();
  });
});
