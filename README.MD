# Node TypeScript Starter

![Node-TS-Starter Banner](./assets/node-ts-starter-banner.png)

A modern, minimal Node.js starter template with TypeScript, Jest testing, and essential tooling pre-configured.

## ✨ Features

- **TypeScript** - Full TypeScript support with modern ES features
- **Testing** - Jest testing framework with TypeScript support
- **Hot Reload** - Fast development with `tsx` watch mode
- **Path Mapping** - Clean imports with `@/*` path aliases
- **Environment Variables** - Built-in `.env` file support
- **Modern Tooling** - Configured for modern JavaScript/TypeScript development
- **PNPM Ready** - Optimized for PNPM package manager

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PNPM (recommended) or npm/yarn

### Installation

1. **Clone or download this template**
   ```bash
   # Using git
   git clone <your-repo-url>
   cd node-ts-starter
   
   # Or create from template
   npx create-node-ts-starter my-project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development**
   ```bash
   pnpm dev
   ```

## 📁 Project Structure

```
node-ts-starter/
├── src/
│   ├── index.ts          # Main entry point
│   ├── lib/              # Utility functions and modules
│   │   └── math.ts       # Example utility module
│   └── tests/            # Test files
│       └── index.test.ts # Example tests
├── .env.example          # Environment variables template
├── jest.config.ts        # Jest testing configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm test` | Run test suite |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm build` | Build for production (add build script as needed) |

## ⚙️ Configuration

### TypeScript Configuration

The project uses modern TypeScript configuration with:
- ES Next target and modules
- Path mapping (`@/*` → `./src/*`)
- Strict type checking
- Decorator support

### Jest Testing

- Full TypeScript support via `ts-jest`
- Path mapping support
- Coverage collection configured
- Test files: `*.test.ts` or `*.spec.ts`

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Example environment variables
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
```

Access in your code:
```typescript
console.log(process.env.PORT); // 3000
```

## 📝 Usage Examples

### Adding New Modules

1. Create your module in `src/lib/`:
   ```typescript
   // src/lib/api.ts
   export const fetchData = async (url: string) => {
     // Your implementation
   };
   ```

2. Import using path mapping:
   ```typescript
   // src/index.ts
   import { fetchData } from '@/lib/api';
   ```

### Writing Tests

```typescript
// src/tests/api.test.ts
import { describe, expect, test } from '@jest/globals';
import { fetchData } from '@/lib/api';

describe('API', () => {
  test('fetchData should return data', async () => {
    const result = await fetchData('https://api.example.com');
    expect(result).toBeDefined();
  });
});
```

## 🏗️ Building for Production

Add build script to `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

Then build and run:
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🛟 Support

If you find this starter helpful, please ⭐ star the repository!

For questions or issues, please [open an issue](https://github.com/your-username/node-ts-starter/issues).

---

**Happy coding!** 🎉