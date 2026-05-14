const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const packageJsonPath = path.join(root, "package.json");
const constantsPath = path.join(root, "src", "utils", "Constants.js");

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const constants = fs.readFileSync(constantsPath, "utf8");
const versionMatch = constants.match(
  /export const CARD_VERSION = ["']([^"']+)["']/,
);

if (!versionMatch || pkg.version !== versionMatch[1]) {
  console.error(
    "Version mismatch! package.json:",
    pkg.version,
    "Constants.js:",
    versionMatch ? versionMatch[1] : "not found",
  );
  process.exit(1);
}

console.log("Versions match:", pkg.version);
