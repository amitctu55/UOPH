import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const requiredArtifacts = [
  "services/gateway/dist/main.js",
  "services/auth/dist/main.js",
  "services/user/dist/main.js",
];

console.log("Running CI integration gate...");

if (!existsSync("node_modules")) {
  console.log("Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });
}

console.log("Building workspace packages...");
execSync("npm run build", { stdio: "inherit" });

for (const artifact of requiredArtifacts) {
  if (!existsSync(artifact)) {
    console.error(`Missing build artifact: ${artifact}`);
    process.exit(1);
  }
}

console.log("Integration gate passed.");
