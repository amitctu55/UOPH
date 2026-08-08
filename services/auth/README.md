# UPCHAR Auth Service

JWT authentication and registration for the UPCHAR platform.

## Features
- `POST /auth/register` — create patient account
- `POST /auth/login` — email + password → access/refresh tokens
- `GET /auth/me` — current user from Bearer JWT
- `GET /auth/health` — liveness
- Swagger UI at `/auth/docs`
- Embedded MongoDB for local/dev (`USE_MEMORY_MONGO=true`)

## Configure
```bash
cd services/auth
cp .env.example .env
# edit JWT_SECRET and optionally MONGODB_URI
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `4000` | HTTP port |
| `JWT_SECRET` | required in prod | Signing secret |
| `JWT_EXPIRATION` | `3600` | Access token lifetime (seconds) |
| `JWT_REFRESH_EXPIRATION` | `604800` | Refresh token lifetime (seconds) |
| `MONGODB_URI` | empty | External Mongo connection string |
| `USE_MEMORY_MONGO` | `true` | Use embedded Mongo when URI empty |
| `CORS_ORIGINS` | localhost 3000/3001 | Allowed browser origins |

## Run locally
```bash
cd services/auth
npm install --ignore-scripts
npm run build
npm start
# or: npm run start:dev
```

Health: `http://localhost:4000/auth/health`  
Docs: `http://localhost:4000/auth/docs`

### Example
```bash
# Register
curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"patient@upchar.health","username":"Alex","password":"SecurePass123!"}'

# Login (username = email)
curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"patient@upchar.health","password":"SecurePass123!"}'
```

## Production
Set `USE_MEMORY_MONGO=false` and provide a real `MONGODB_URI`. Rotate `JWT_SECRET`.
