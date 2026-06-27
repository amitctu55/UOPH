# UPCHAR Healthcare Platform - Implementation Guide

**Version:** 1.0  
**Audience:** Development Team, DevOps Engineers, Project Managers  
**Last Updated:** 2026-06-22

---

## Quick Start for Developers

### 1. Clone and Setup

```bash
# Clone repository
git clone https://github.com/upchar/upchar-platform.git
cd upchar-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.development
cp .env.example .env.staging
cp .env.example .env.production

# Edit environment files with appropriate values
nano .env.development
```

### 2. Local Development Setup

```bash
# Start Docker services (PostgreSQL, Redis, Elasticsearch)
docker-compose up -d

# Run database migrations
npm run db:migrate

# Seed development data
npm run db:seed

# Start all services in development mode
npm run dev

# Services will run on:
# - Gateway: http://localhost:3000
# - Auth Service: http://localhost:4000
# - Appointment Service: http://localhost:4001
# - Docs (Swagger): http://localhost:3000/api/docs
```

### 3. Project Structure Navigation

```
upchar-platform/
├── apps/
│   ├── public-website/          # Next.js website
│   ├── patient-dashboard/       # React patient app
│   ├── doctor-dashboard/        # React doctor app
│   ├── hospital-dashboard/      # React hospital app
│   └── admin-dashboard/         # React admin app
├── mobile/
│   └── patient-app/             # React Native mobile app
├── services/
│   ├── auth/                    # Authentication microservice
│   ├── gateway/                 # API Gateway
│   ├── appointment/             # Appointment management
│   ├── user/                    # User management
│   ├── doctor/                  # Doctor operations
│   ├── telemedicine/            # Video consultations
│   ├── medical-records/         # Medical document storage
│   ├── billing/                 # Billing & payments
│   ├── notification/            # Email, SMS, push
│   ├── pharmacy/                # Pharmacy operations
│   ├── search/                  # Elasticsearch integration
│   └── analytics/               # Business analytics
├── libs/
│   └── shared/                  # Shared utilities
├── infra/
│   ├── database/                # Database scripts
│   ├── terraform/               # Infrastructure-as-Code
│   ├── aks/                     # Kubernetes manifests
│   ├── helm/                    # Helm charts
│   ├── monitoring/              # Prometheus, Grafana, ELK
│   └── argocd/                  # GitOps configuration
├── docs/
│   ├── API_REFERENCE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── PRODUCTION_CHECKLIST.md
│   ├── architecture/
│   ├── security/
│   ├── devops/
│   └── roadmap/
└── .github/workflows/           # GitHub Actions CI/CD
```

---

## Backend Service Development Guide

### Creating a New Microservice

#### Step 1: Generate Service Scaffold

```bash
# Create service directory
mkdir -p services/my-service
cd services/my-service

# Initialize NestJS service
npm init
npm install @nestjs/core @nestjs/common @nestjs/config @nestjs/typeorm
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install typeorm pg
npm install --save-dev @nestjs/cli typescript
```

#### Step 2: Create Service Structure

```bash
# Generate NestJS modules
npx nest generate module my-feature
npx nest generate controller my-feature
npx nest generate service my-feature
```

#### Step 3: Database Integration

```typescript
// src/app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['src/**/*.entity.ts'],
      synchronize: false,
      migrations: ['src/migrations/*.ts'],
    }),
  ],
})
export class AppModule {}
```

#### Step 4: API Endpoints

```typescript
// src/my-feature/my-feature.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('My Feature')
@Controller('my-feature')
@ApiBearerAuth()
export class MyFeatureController {
  constructor(private service: MyFeatureService) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() dto: CreateMyFeatureDto) {
    return this.service.create(dto);
  }
}
```

#### Step 5: Docker Integration

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "run", "start:prod"]
```

---

## Frontend Application Development Guide

### Building with Next.js (Public Website)

#### Step 1: Project Setup

```bash
cd apps/public-website

# Create pages
mkdir -p app/(pages)/{about,services,doctors,blog}

# Create components
mkdir -p app/components/{Header,Footer,Hero,Navigation}

# Create styles and utilities
mkdir -p lib/{api,utils,seo}
```

#### Step 2: Create Core Pages

```typescript
// app/(pages)/about/page.tsx
'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About UPCHAR - Healthcare Platform',
  description: 'Learn about UPCHAR healthcare platform...',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About UPCHAR</h1>
      <p className="text-lg text-gray-700">
        UPCHAR is revolutionizing healthcare delivery...
      </p>
    </div>
  );
}
```

#### Step 3: API Integration

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.upchar.com';

export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// Usage in components
const doctors = await apiCall('/doctors/search?specialization=Cardiology');
```

#### Step 4: SEO Optimization

```typescript
// lib/seo.ts
export function generateMetadata(title: string, description: string) {
  return {
    title: `${title} - UPCHAR Healthcare`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://upchar.com',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
```

### Building React Dashboards

#### Step 1: Project Structure

```bash
cd apps/patient-dashboard

# Create pages
mkdir -p src/pages/{dashboard,appointments,medical-records,pharmacy}

# Create components
mkdir -p src/components/{Layout,Sidebar,Card,Modal}

# Create state management
mkdir -p src/store
mkdir -p src/hooks
```

#### Step 2: State Management (Zustand)

```typescript
// src/store/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    set({ user: data.user, token: data.accessToken });
  },
  logout: () => set({ user: null, token: null }),
}));
```

#### Step 3: Custom Hooks

```typescript
// src/hooks/useAppointments.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiCall } from '@/lib/api';

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => apiCall('/appointments/patient/me'),
  });
}

export function useBookAppointment() {
  return useMutation({
    mutationFn: (data) => apiCall('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  });
}
```

---

## Mobile Application Development Guide

### React Native Setup

#### Step 1: Project Initialization

```bash
cd mobile/patient-app

# Initialize React Native
npx create-expo-app patient-app
cd patient-app

# Install essential packages
npx expo install expo-router
npx expo install @react-navigation/native @react-navigation/stack
npm install axios zustand react-query
```

#### Step 2: Navigation Structure

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

#### Step 3: Authentication Flow

```typescript
// app/(auth)/login.tsx
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 p-3 mb-4 rounded"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 p-3 mb-4 rounded"
      />
      <Button title="Login" onPress={() => login(email, password)} />
    </View>
  );
}
```

---

## Database Development Guide

### Creating Migrations

```bash
# Generate migration
typeorm migration:generate src/migrations/CreateUsersTable

# Migration file structure
src/migrations/1234567890-CreateUsersTable.ts:

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          // ... more columns
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

### Running Migrations

```bash
# Run pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert

# Show migration status
npm run typeorm migration:show
```

---

## Testing Guide

### Unit Testing

```typescript
// src/my-feature/my-feature.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MyFeatureService } from './my-feature.service';

describe('MyFeatureService', () => {
  let service: MyFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyFeatureService],
    }).compile();

    service = module.get<MyFeatureService>(MyFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all items', async () => {
    const result = [{ id: '1', name: 'Item 1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:cov

# Run specific test file
npm test -- src/my-feature/my-feature.service.spec.ts
```

---

## Deployment Process

### Staging Deployment

```bash
# Build and push image
docker build -t upcharacr.azurecr.io/upchar-service:latest .
docker push upcharacr.azurecr.io/upchar-service:latest

# Deploy to staging AKS
kubectl set image deployment/upchar-service \
  upchar-service=upcharacr.azurecr.io/upchar-service:latest \
  -n staging

# Monitor deployment
kubectl rollout status deployment/upchar-service -n staging
```

### Production Deployment

```bash
# Follow production checklist
# 1. Run all tests
npm test

# 2. Build production image
docker build -t upcharacr.azurecr.io/upchar-service:1.0.0 .
docker push upcharacr.azurecr.io/upchar-service:1.0.0

# 3. Backup production database
az postgres flexible-server backup create \
  --resource-group upchar-rg-prod \
  --server-name upchar-db-prod \
  --backup-name "pre-deployment-$(date +%Y%m%d-%H%M%S)"

# 4. Blue-green deployment
helm upgrade upchar ./helm/upchar-platform \
  --values values-prod.yaml \
  --set image.tag=1.0.0 \
  --wait

# 5. Verify deployment
kubectl get pods -n production
```

---

## Troubleshooting Common Issues

### Database Connection Issues

```bash
# Check PostgreSQL connectivity
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT version();"

# Check if services can reach database
kubectl run -it --rm debug --image=postgres:15 \
  -- psql -h upchar-db-prod.postgres.database.azure.com \
  -U admin -d upchardb -c "SELECT 1;"
```

### Service Communication Issues

```bash
# Check service endpoints
kubectl get endpoints -n production

# Test service-to-service communication
kubectl exec -it <pod> -n production -- \
  curl http://other-service:3000/health
```

### Memory/CPU Issues

```bash
# Check resource usage
kubectl top nodes
kubectl top pods -n production

# Update resource limits
kubectl set resources deployment/upchar-service \
  --limits=cpu=1,memory=1Gi \
  --requests=cpu=500m,memory=512Mi \
  -n production
```

---

## Performance Optimization Tips

### Database Optimization
- ✅ Use indexes for frequently queried columns
- ✅ Implement connection pooling
- ✅ Use materialized views for complex queries
- ✅ Enable query caching with Redis

### Application Optimization
- ✅ Implement pagination for list endpoints
- ✅ Use caching headers (ETag, Cache-Control)
- ✅ Compress API responses (gzip)
- ✅ Optimize image sizes and formats
- ✅ Implement lazy loading in frontend

### Infrastructure Optimization
- ✅ Enable CDN for static assets
- ✅ Use auto-scaling policies
- ✅ Implement proper monitoring and alerts
- ✅ Regular performance testing

---

## Security Best Practices

### Development
- ✅ Use `.env` files for secrets (never commit)
- ✅ Validate all user inputs
- ✅ Use parameterized queries
- ✅ Implement rate limiting
- ✅ Log security events

### Production
- ✅ Use Azure Key Vault for secrets
- ✅ Enable HTTPS/TLS everywhere
- ✅ Implement DDoS protection
- ✅ Regular security audits
- ✅ Keep dependencies updated

---

## Support & Resources

### Documentation
- **API Reference:** `docs/API_REFERENCE.md`
- **Deployment Guide:** `docs/DEPLOYMENT_GUIDE.md`
- **Architecture:** `docs/architecture/`
- **Security:** `docs/security/`

### Communication Channels
- **Slack:** #upchar-development
- **Issues:** GitHub Issues
- **PR Review:** Code review guidelines
- **Architecture Decisions:** ADR documents

---

**Document Version:** 1.0  
**Last Updated:** 2026-06-22  
**Next Update:** 2026-07-06
