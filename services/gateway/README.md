# UPCHAR API Gateway

The API Gateway is the central entry point for all UPCHAR web and mobile clients.

## Responsibilities
- Authentication enforcement and JWT validation
- Request routing to backend microservices
- API aggregation for cross-service operations
- OpenAPI documentation and health endpoints

## Run locally
1. Install dependencies: `npm install`
2. Start local server: `npm run start:dev`
3. Open Swagger docs at `http://localhost:3000/api`

## Run with Docker Compose
1. From the repo root: `docker-compose up --build`
2. Gateway: `http://localhost:3000`
3. Auth service: `http://localhost:4000`

## Notes
- This service is intended to proxy authenticated traffic to downstream services.
- Use `libs/shared` for auth/session models and helpers.
