# Node TypeScript Starter

![Node-TS-Starter Banner](./assets/node-ts-starter-banner.png)

A clean, modern Node.js starter template with TypeScript, Jest testing, and path aliases pre-configured for rapid development.

## ✨ Features

- **TypeScript** - Full TypeScript support with strict type checking
- **Jest Testing** - Complete test setup with TypeScript integration
- **Hot Reload** - Fast development with `tsx` watch mode
- **Path Aliases** - Clean imports using `@/*` mapping
- **Environment Variables** - Native `.env` support via `--env-file`
- **Zero Config** - Ready to use out of the box

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PNPM (recommended)

### Installation
```bash
git clone <your-repo-url> my-project
cd my-project
pnpm install
```

### Setup
```bash
# Copy environment template
cp .env.example .env

# Start development
pnpm dev
```

## 📁 Project Structure

```
src/
├── index.ts              # Main entry point
├── lib/                  # Utility functions
│   └── math.ts          # Example utilities
└── tests/               # Test files
    └── index.test.ts    # Example tests
```

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |

## ⚙️ Key Features

### Path Aliases
Use clean imports throughout your project:
```typescript
// Instead of relative paths
import { add } from '../../../lib/math';

// Use clean aliases
import { add } from '@/lib/math';
```

### Environment Variables
The project uses Node.js native `--env-file` support:
```bash
# .env
PORT=3000
```

```typescript
// Access in code
console.log(process.env.PORT); // 3000
```

### Testing
Write tests using Jest with full TypeScript support:
```typescript
import { describe, expect, test } from '@jest/globals';
import { add } from '@/lib/math';

describe('Math utilities', () => {
  test('should add numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

## 🏗️ Production Build

```bash
# Compile TypeScript with path resolution
pnpm build

# Run production server
pnpm start
```

The build process uses `tsc-alias` to resolve path mappings in the compiled JavaScript.

## 📝 Development

### Adding New Features
1. Create your module in `src/lib/`
2. Add tests in `src/tests/`
3. Import using `@/` aliases
4. Run `pnpm test` to verify

### Project Configuration
- **TypeScript**: Configured for strict mode with ES modules
- **Jest**: Set up with `ts-jest` and path mapping support
- **Environment**: Native Node.js `--env-file` integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marc Tyson CLEBERT**  
📧 [contact@marctysonclebert.com](mailto:contact@marctysonclebert.com)

---

**Happy coding!** 🎉