/**
 * npm workspaces hoists deps to the repo root on Windows, but Next.js
 * resolves from apps/web/node_modules first. Junction-link critical packages.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const webModules = path.join(root, "apps", "web", "node_modules");
const packages = ["react", "react-dom", "lucide-react", "next"];

if (process.platform !== "win32") return;

for (const pkg of packages) {
  const target = path.join(root, "node_modules", pkg);
  const link = path.join(webModules, pkg);
  if (!fs.existsSync(target) || fs.existsSync(link)) continue;
  fs.mkdirSync(webModules, { recursive: true });
  try {
    execSync(`cmd /c mklink /J "${link}" "${target}"`, { stdio: "ignore" });
  } catch {
    /* ignore if link fails */
  }
}
