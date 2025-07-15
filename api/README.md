# API

This directory contains API services and backend applications.

## Structure

Each API service should be in its own subdirectory with:
- `package.json` - Package configuration
- `src/` - Source code
- `routes/` - API routes
- `middleware/` - Express middleware
- `models/` - Data models
- `controllers/` - Route controllers
- `services/` - Business logic
- `README.md` - API documentation

## Examples

- `main/` - Main API service
- `auth/` - Authentication service
- `notifications/` - Notification service
- `webhooks/` - Webhook handlers
- `graphql/` - GraphQL API

## Creating a New API Service

```bash
mkdir api/my-service
cd api/my-service
pnpm init
```

Standard scripts to include:
- `dev` - Development server with hot reload
- `build` - Production build
- `start` - Production server
- `test` - Test runner
- `lint` - Linting

## Environment Variables

Each API service should have:
- `.env.example` - Example environment file
- Proper environment validation
- Secure secret management
