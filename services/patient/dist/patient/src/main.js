"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const patient_module_1 = require("./patient/patient.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(patient_module_1.PatientModule);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Patient service running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map