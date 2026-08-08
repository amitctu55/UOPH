const baseUrlArg = process.argv.find(arg => arg.startsWith("--base-url="));
const baseUrl = baseUrlArg?.slice("--base-url=".length) ?? process.env.SMOKE_BASE_URL;

if (!baseUrl) {
  console.log("No smoke test base URL configured; skipping remote checks.");
  process.exit(0);
}

const healthUrl = `${baseUrl.replace(/\/$/, "")}/health`;

try {
  const response = await fetch(healthUrl, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    console.error(`Smoke test failed: ${healthUrl} returned ${response.status}`);
    process.exit(1);
  }
  console.log(`Smoke test passed: ${healthUrl}`);
} catch (error) {
  console.error(`Smoke test failed for ${healthUrl}:`, error.message);
  process.exit(1);
}
