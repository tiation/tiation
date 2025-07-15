# Packages

This directory contains shared libraries and components used across the monorepo.

## Structure

Each package should be in its own subdirectory with:
- `package.json` - Package configuration
- `src/` - Source code
- `dist/` - Built output (generated)
- `README.md` - Package documentation

## Examples

- `ui/` - Shared UI components
- `utils/` - Utility functions
- `config/` - Shared configuration
- `types/` - TypeScript type definitions
- `hooks/` - React hooks
- `constants/` - Application constants

## Creating a New Package

```bash
mkdir packages/my-package
cd packages/my-package
pnpm init
```

Make sure to configure:
- `main` - Entry point for CommonJS
- `module` - Entry point for ES modules
- `types` - TypeScript declarations
- `exports` - Modern export conditions

## Publishing

Packages in this directory can be published to npm or used internally within the monorepo.
