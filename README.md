# Tiation Monorepo

A modern monorepo built for fast and beautiful applications.

## 🏗️ Structure

```
tiation/
├── apps/           # Applications (web, mobile, desktop)
├── packages/       # Shared libraries and components
├── api/            # API services and backends
├── docs/           # Documentation
├── infrastructure/ # Infrastructure as code
├── scripts/        # Build and deployment scripts
└── ...
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Format code
pnpm format
```

## 📦 Package Management

This monorepo uses PNPM workspaces with Turbo for efficient builds and caching.

### Adding Dependencies

```bash
# Add to root
pnpm add -w <package>

# Add to specific workspace
pnpm add <package> --filter <workspace-name>
```

### Creating New Packages

```bash
# Create new app
mkdir apps/my-app
cd apps/my-app
pnpm init

# Create new package
mkdir packages/my-package
cd packages/my-package
pnpm init
```

## 🛠️ Development

- **Node.js**: >=18.0.0
- **PNPM**: >=8.0.0
- **TypeScript**: ^5.0.0

## 📚 Documentation

- [Architecture](docs/architecture.md)
- [Contributing](docs/contributing.md)
- [Deployment](docs/deployment.md)

## 🤝 Contributing

Please read our [contributing guidelines](docs/contributing.md) before submitting PRs.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
