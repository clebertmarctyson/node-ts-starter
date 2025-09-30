#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

interface PackageJson {
  name?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  scripts?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

interface TsConfig {
  compilerOptions?: {
    types?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = async (query: string): Promise<string> => {
  return new Promise(resolve => rl.question(query, resolve));
}

async function cleanupProject(): Promise<void> {
  console.log('🧹 Starting project cleanup...\n');

  // 1. Get project name from parent folder
  const projectName = path.basename(process.cwd());
  
  // Convert to npm package naming convention (lowercase, replace spaces/special chars with hyphens)
  const npmName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-~]/g, '-')  // Replace invalid chars with hyphen
    .replace(/^-+|-+$/g, '')       // Remove leading/trailing hyphens
    .replace(/-+/g, '-');          // Replace multiple hyphens with single

  console.log(`📦 Setting project name to: "${npmName}"\n`);

  // 2. Update package.json
  console.log('📝 Cleaning package.json...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = npmName;
  packageJson.description = "";
  packageJson.keywords = [];

  // 2. Ask about tests
  const keepTests = await question('❓ Do you want to keep tests in the project? (yes/no): ');
  const removeTests = keepTests.toLowerCase().trim() !== 'yes';

  if (removeTests) {
    console.log('🗑️  Removing test dependencies...');
    
    // Remove test-related devDependencies
    const testPackages = ['@jest/globals', '@types/jest', 'jest', 'ts-jest'];
    testPackages.forEach(pkg => {
      if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
        delete packageJson.devDependencies[pkg];
      }
    });

    // Remove test scripts
    if (packageJson.scripts) {
      delete packageJson.scripts.test;
      delete packageJson.scripts['test:watch'];
    }

    // Remove jest.config.ts
    const jestConfigPath = path.join(process.cwd(), 'jest.config.ts');
    if (fs.existsSync(jestConfigPath)) {
      fs.unlinkSync(jestConfigPath);
      console.log('✅ Removed jest.config.ts');
    }

    // Remove tests folder recursively
    const testsPath = path.join(process.cwd(), 'tests');
    if (fs.existsSync(testsPath)) {
      fs.rmSync(testsPath, { recursive: true, force: true });
      console.log('✅ Removed tests folder');
    }

    // Update tsconfig.json to remove jest types
    console.log('📝 Updating tsconfig.json...');
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      try {
        let tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
        
        // Remove comments and trailing commas for parsing
        const cleanContent = tsconfigContent
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
          .replace(/\/\/.*/g, '')            // Remove // comments
          .replace(/,(\s*[}\]])/g, '$1');    // Remove trailing commas
        
        const tsconfig: TsConfig = JSON.parse(cleanContent);
        
        if (tsconfig.compilerOptions?.types) {
          // Filter out jest from types array
          const originalTypes = tsconfig.compilerOptions.types;
          const filteredTypes = originalTypes.filter((type: string) => type !== 'jest');
          
          if (filteredTypes.length !== originalTypes.length) {
            // Replace the types array in the original content
            const typesRegex = /"types"\s*:\s*\[([^\]]*)\]/;
            const match = tsconfigContent.match(typesRegex);
            
            if (match) {
              const newTypesString = `"types": [${filteredTypes.map(t => `"${t}"`).join(', ')}]`;
              tsconfigContent = tsconfigContent.replace(typesRegex, newTypesString);
              fs.writeFileSync(tsconfigPath, tsconfigContent);
              console.log('✅ Removed jest types from tsconfig.json');
            }
          }
        }
      } catch (error) {
        console.warn('⚠️  Could not update tsconfig.json automatically. Please remove "jest" from types array manually.');
      }
    }
  }

  // Remove cleanup script from package.json
  if (packageJson.scripts?.cleanup) {
    delete packageJson.scripts.cleanup;
    console.log('✅ Removed cleanup script from package.json');
  }

  // Remove type: module from package.json (no longer needed after cleanup)
  if (packageJson.type === 'module') {
    delete packageJson.type;
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ Updated package.json');

  // 3. Remove pnpm-lock.yaml
  const lockPath = path.join(process.cwd(), 'pnpm-lock.yaml');
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log('✅ Removed pnpm-lock.yaml');
  }

  // 4. Clear README.md
  const readmePath = path.join(process.cwd(), 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, '# My Project\n\n');
    console.log('✅ Cleared README.md');
  }

  // 5. Remove src/lib/math.ts
  const mathPath = path.join(process.cwd(), 'src', 'lib', 'math.ts');
  if (fs.existsSync(mathPath)) {
    fs.unlinkSync(mathPath);
    console.log('✅ Removed src/lib/math.ts');
  }

  // 6. Ask about installing packages
  const installPackages = await question('\n❓ Do you want to install packages now? (yes/no): ');
  if (installPackages.toLowerCase().trim() === 'yes') {
    console.log('\n📦 Installing packages with pnpm...');
    try {
      execSync('pnpm install', { stdio: 'inherit' });
      console.log('✅ Packages installed successfully');
    } catch (error) {
      console.error('❌ Error installing packages:', error);
    }
  }

  // 7. Ask about removing cleanup script
  const removeCleanup = await question('\n❓ Do you want to remove the cleanup script? (yes/no): ');
  if (removeCleanup.toLowerCase().trim() === 'yes') {
    // Remove cleanup script from package.json
    if (packageJson.scripts?.cleanup) {
      delete packageJson.scripts.cleanup;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('✅ Removed cleanup script from package.json');
    }

    // Remove type: module from package.json (no longer needed after cleanup)
    if (packageJson.type === 'module') {
      delete packageJson.type;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('✅ Removed "type": "module" from package.json');
    }

    // Remove this cleanup script file
    const scriptPath = path.join(process.cwd(), 'cleanup.ts');
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
      console.log('✅ Removed cleanup.ts script');
    }
  } else {
    console.log('ℹ️  Cleanup script kept - you can run it again if needed');
  }

  console.log('\n🎉 Project cleanup complete! Ready for a fresh start.');
  console.log('💡 Next steps:');
  console.log('   1. Update package.json with your project details');

  if (installPackages.toLowerCase().trim() !== 'yes') {
    console.log('   2. Run: pnpm install');
    console.log('   3. Start coding!\n');
  } else {
    console.log('   2. Start coding!\n');
  }

  rl.close();
}

cleanupProject().catch(err => {
  console.error('❌ Error during cleanup:', err);
  rl.close();
  process.exit(1);
});