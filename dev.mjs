import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
process.chdir(__dirname);

const port = process.env.PORT || 3000;
execSync(`node node_modules/next/dist/bin/next dev --turbopack -p ${port}`, {
  stdio: "inherit",
  cwd: __dirname,
});
