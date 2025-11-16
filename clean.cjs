#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function cleanProject() {
  console.log("\n🧹 Project Cleanup\n");

  // 1. Get project name from parent folder
  const projectName = path.basename(process.cwd());
  const npmName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-~]/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  // 2. Update package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.name = npmName;
  packageJson.description = "";
  packageJson.keywords = [];

  // 3. Ask about tests
  const keepTests = await question("Keep tests? (y/n): ");
  console.log("");
  const removeTests =
    keepTests.toLowerCase().trim() !== "y" &&
    keepTests.toLowerCase().trim() !== "yes";

  if (removeTests) {
    // Remove test-related devDependencies
    const testPackages = ["@jest/globals", "@types/jest", "jest", "ts-jest"];
    testPackages.forEach((pkg) => {
      if (packageJson.devDependencies?.[pkg]) {
        delete packageJson.devDependencies[pkg];
      }
    });

    // Remove test scripts
    if (packageJson.scripts) {
      delete packageJson.scripts.test;
      delete packageJson.scripts["test:watch"];
    }

    // Remove jest.config.ts
    const jestConfigPath = path.join(process.cwd(), "jest.config.ts");
    if (fs.existsSync(jestConfigPath)) {
      fs.unlinkSync(jestConfigPath);
      console.log("Deleted: jest.config.ts");
    }

    // Remove tests folders
    const testsPaths = [
      path.join(process.cwd(), "tests"),
      path.join(process.cwd(), "src", "tests"),
    ];

    for (const testsPath of testsPaths) {
      if (fs.existsSync(testsPath)) {
        if (process.platform === "win32") {
          execSync(`rmdir /s /q "${testsPath}"`, { stdio: "ignore" });
        } else {
          execSync(`rm -rf "${testsPath}"`, { stdio: "ignore" });
        }
        console.log(`Deleted: ${path.relative(process.cwd(), testsPath)}/`);
      }
    }

    // Update tsconfig.json
    const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
    if (fs.existsSync(tsconfigPath)) {
      let tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
      const typesRegex = /"types"\s*:\s*\[([\s\S]*?)\]/;
      const match = tsconfigContent.match(typesRegex);

      if (match) {
        const typesArrayContent = match[1];
        const updatedTypesContent = typesArrayContent
          .replace(/,?\s*"jest"\s*,?/g, "")
          .replace(/,\s*,/g, ",")
          .replace(/,\s*$/g, "")
          .replace(/^\s*,/g, "");

        const newTypesString = `"types": [${updatedTypesContent}]`;
        tsconfigContent = tsconfigContent.replace(typesRegex, newTypesString);
        fs.writeFileSync(tsconfigPath, tsconfigContent, "utf8");
      }
    }
  }

  // Write updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8"
  );

  // 4. Remove pnpm-lock.yaml
  const lockPath = path.join(process.cwd(), "pnpm-lock.yaml");
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log("Deleted: pnpm-lock.yaml");
  }

  // 5. Clear README.md
  const rootDir = process.cwd();
  const files = fs.readdirSync(rootDir);
  const readmeFile = files.find((file) => file.toLowerCase() === "readme.md");

  if (readmeFile) {
    const readmePath = path.join(rootDir, readmeFile);
    fs.writeFileSync(readmePath, "# My Project\n\n", "utf8");
  }

  // 6. Remove src/lib/math.ts
  const mathPath = path.join(process.cwd(), "src", "lib", "math.ts");
  if (fs.existsSync(mathPath)) {
    fs.unlinkSync(mathPath);
    console.log("Deleted: src/lib/math.ts");
  }

  // 7. Move .env.example to .env
  const envExamplePath = path.join(process.cwd(), ".env.example");
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envExamplePath)) {
    fs.renameSync(envExamplePath, envPath);
  }

  // 8. Ask about installing packages
  const installPackages = await question("Install packages? (y/n): ");
  console.log("");
  if (
    installPackages.toLowerCase().trim() === "y" ||
    installPackages.toLowerCase().trim() === "yes"
  ) {
    console.log("\nInstalling packages...\n");
    execSync("pnpm install", { stdio: "inherit" });
  }

  console.log("\n✨ Done!\n");
  rl.close();
}

cleanProject().catch((err) => {
  console.error("Error:", err.message);
  rl.close();
  process.exit(1);
});
