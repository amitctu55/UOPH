# UPCHAR Auth Service

This service implements authentication and session management for the UPCHAR platform.

## What’s included
- NestJS scaffold with modules, controllers, and services
- JWT authentication stubs
- Google OAuth and OTP-ready architecture
- Configuration via environment variables
- Health check endpoint

## Run locally
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Run locally: `npm run start:dev`

## API endpoints
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/health`

## Docker
Build the container with `docker build -t upchar-auth-service .`
