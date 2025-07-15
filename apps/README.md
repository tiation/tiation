# Apps

This directory contains the main applications of the monorepo.

## Structure

Each app should be in its own subdirectory with:
- `package.json` - Package configuration
- `src/` - Source code
- `public/` - Static assets (for web apps)
- `README.md` - App-specific documentation

## Examples

- `web/` - Main web application
- `mobile/` - React Native mobile app
- `desktop/` - Electron desktop app
- `admin/` - Admin dashboard
- `landing/` - Marketing website

## Creating a New App

```bash
mkdir apps/my-app
cd apps/my-app
pnpm init
```

Make sure to add the appropriate scripts in package.json:
- `dev` - Development server
- `build` - Production build
- `test` - Test runner
- `lint` - Linting
