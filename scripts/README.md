# Scripts

This directory contains build, deployment, and utility scripts.

## Structure

```
scripts/
├── build/             # Build scripts
├── deploy/            # Deployment scripts
├── dev/              # Development utilities
├── test/             # Testing scripts
├── migration/        # Database migration scripts
├── setup/            # Environment setup scripts
└── utils/            # General utility scripts
```

## Script Categories

### Build Scripts
- `build.sh` - Main build script
- `build-docker.sh` - Docker image building
- `build-assets.sh` - Asset compilation
- `clean.sh` - Clean build artifacts

### Deployment Scripts
- `deploy.sh` - Main deployment script
- `deploy-staging.sh` - Staging deployment
- `deploy-production.sh` - Production deployment
- `rollback.sh` - Rollback deployment

### Development Scripts
- `dev-setup.sh` - Development environment setup
- `dev-reset.sh` - Reset development environment
- `generate-types.sh` - Generate TypeScript types
- `seed-data.sh` - Seed development data

### Testing Scripts
- `test.sh` - Run all tests
- `test-unit.sh` - Run unit tests
- `test-integration.sh` - Run integration tests
- `test-e2e.sh` - Run end-to-end tests

## Usage

Make scripts executable:
```bash
chmod +x scripts/**/*.sh
```

Run scripts from root:
```bash
./scripts/build/build.sh
./scripts/deploy/deploy-staging.sh
```

## Best Practices

- Use shell scripting best practices
- Include error handling
- Make scripts idempotent
- Document script parameters
- Use consistent naming conventions
- Include logging and progress indicators
