# ⚡ Node TypeScript Starter

![Node-TS-Starter Banner](./assets/node-ts-starter-banner.png)

> 🚀 A blazing-fast, production-ready Node.js starter template that gets you coding in seconds, not hours.

Built with modern TypeScript, comprehensive testing, and developer-friendly tooling. Perfect for APIs, CLIs, microservices, and any Node.js project.

## ✨ What's Inside?

🎯 **TypeScript First** - Strict typing with zero configuration headaches  
🧪 **Jest Ready** - Write tests that actually matter  
🔥 **Hot Reload** - See changes instantly with `tsx` magic  
📁 **Smart Imports** - Clean `@/*` paths instead of `../../../hell`  
🌍 **Environment Sync** - Native `.env` support that just works  
🧹 **Auto Cleanup** - Smart script to prepare your project in seconds  
⚡ **Zero Setup** - Clone, install, code. That's it.

## 🚀 Get Started in 30 Seconds

```bash
# 📥 Create your project
npx degit clebertmarctyson/node-ts-starter my-awesome-project

# 📂 Jump in
cd my-awesome-project

# 🧹 Clean up template files (optional but recommended)
pnpm clean

# 📦 Install dependencies (if you didn't install during cleanup)
pnpm install

# 🎉 Start building!
pnpm dev
```

**Boom!** Your TypeScript server is running with hot reload. Time to build something amazing! 🎯

## 🧹 Smart Project Cleanup

The included `pnpm clean` command intelligently prepares your project:

- ✅ Auto-names your project based on folder name
- 🗑️ Removes example files (like `src/lib/math.ts`)
- 🧪 Optionally removes test setup if you don't need it
- 📦 Optionally installs dependencies for you
- 📝 Clears README.md for your own documentation
- ⚙️ Sets up `.env` file from `.env.example`

**Just answer two simple questions and you're ready to go!**

```bash
pnpm clean

# Keep tests? (y/n): n
# 
# Deleted: jest.config.ts
# Deleted: tests/
# Deleted: pnpm-lock.yaml
# Deleted: src/lib/math.ts
# 
# Install packages? (y/n): y
# 
# Installing packages...
# 
# ✨ Done!
```

## 📁 Project Structure

```
🎯 my-awesome-project/
├── 📂 src/
│   ├── 🎯 index.ts              # Your app starts here
│   ├── 📂 lib/                  # Reusable magic
│   │   └── 🧮 math.ts          # Example utilities  
│   └── 📂 tests/               # Test suite
│       └── ✅ index.test.ts    # Example tests
├── 🖼️ assets/                   # Static files
├── ⚙️ .env.example              # Environment template
├── 🧹 clean.ts                  # Project cleanup script
└── 📋 package.json              # Project config
```

## 🛠️ Power Commands

| 🎯 Command | 📝 What it does |
|------------|----------------|
| `pnpm clean` | 🧹 Prepare your project for development |
| `pnpm dev` | 🔥 Development server with instant hot reload |
| `pnpm build` | 🏗️ Production build with path resolution |
| `pnpm start` | 🚀 Run your compiled production app |
| `pnpm test` | 🧪 Run your test suite once |
| `pnpm test:watch` | 👀 Tests in interactive watch mode |

## 💎 Amazing Features

### 🎯 Smart Path Aliases
Say goodbye to import hell:
```typescript
// 😵 Before: Relative path nightmare
import { helper } from '../../../lib/helpers/utility';

// 😍 After: Clean and beautiful
import { helper } from '@/lib/helpers/utility';
```

### 🌍 Environment Variables Made Easy
Node.js native support means zero dependencies:
```bash
# 📝 .env file
PORT=3000
DATABASE_URL=postgresql://localhost:5432/mydb
API_SECRET=super-secret-key
```

```typescript
// 💻 Use anywhere in your code
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
```

### 🧪 Testing That Doesn't Suck
Write tests with confidence using Jest + TypeScript:
```typescript
import { describe, expect, test } from '@jest/globals';
import { calculateTotal } from '@/lib/calculator';

describe('🧮 Calculator', () => {
  test('should calculate totals like a boss', () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
  });
});
```

## 🏗️ Production Ready

### 🚀 Deploy Anywhere
```bash
# 🔨 Build your masterpiece
pnpm build

# 🌍 Launch to production
pnpm start
```

Your app compiles to clean JavaScript with resolved path aliases - ready for any deployment platform!

### 🎯 Perfect For
- 🌐 **REST APIs** - Express, Fastify, or vanilla Node
- 🔧 **CLI Tools** - Command-line applications  
- ⚡ **Microservices** - Lightweight, fast services
- 🤖 **Automation Scripts** - DevOps and build tools
- 📊 **Data Processing** - ETL pipelines and analytics

## 🎨 Customize Like a Pro

### 🔧 Add Your Favorite Tools
```bash
# 🌐 Web frameworks
pnpm add express fastify

# 🗄️ Databases  
pnpm add prisma mongoose

# 🔒 Security & Auth
pnpm add bcrypt jsonwebtoken

# 📊 Utilities
pnpm add lodash date-fns zod
```

### 📐 Project Structure Pro Tips
- **`src/lib/`** - Your reusable utilities and helpers
- **`src/services/`** - Business logic and external integrations  
- **`src/routes/`** - API endpoints (if building a web server)
- **`src/types/`** - TypeScript type definitions
- **`src/tests/`** - Keep tests close to your code

## 💡 Pro Development Tips

### 🎯 Best Practices Included
- ✅ **Strict TypeScript** - Catch errors before they happen
- 🧪 **Test Coverage** - Jest configured for comprehensive testing
- 📁 **Clean Architecture** - Organized file structure
- 🔄 **Hot Reload** - Instant feedback loop
- 🌍 **Environment Safety** - Secure config management
- 🧹 **Quick Setup** - One command to prepare your project

### 🚀 Productivity Boosters
1. **Run cleanup first** - `pnpm clean` sets up everything in one go
2. **Use path aliases everywhere** - `@/lib/utils` is cleaner than `../../../lib/utils`
3. **Write tests first** - `pnpm test:watch` for TDD workflow
4. **Leverage TypeScript** - Let the compiler catch bugs for you
5. **Keep it simple** - This template has everything you need, nothing you don't

## 🤝 Join the Community

Found this helpful? Here's how you can contribute:

1. 🌟 **Star this repo** - Show some love!
2. 🍴 **Fork & improve** - Make it even better
3. 🐛 **Report issues** - Help us squash bugs
4. 💡 **Share ideas** - What features would you love?

### 🎯 Contributing
```bash
git checkout -b feature/amazing-idea
# Make your changes
git commit -m "feat: add amazing feature"
git push origin feature/amazing-idea
# Open a PR and describe your changes
```

## 📄 License & Credits

**MIT License** - Use it, modify it, ship it! 🚀

Built with ❤️ by **Marc Tyson CLEBERT**  
📧 [contact@marctysonclebert.com](mailto:contact@marctysonclebert.com)

---

## 🎉 Ready to Build Something Amazing?

This isn't just another starter template - it's your launchpad to TypeScript mastery. Every line is crafted for developer happiness and productivity.

**Stop configuring. Start building.** 🚀

---

*⭐ If this template saved you time, give it a star! Your support means the world to open source maintainers.*