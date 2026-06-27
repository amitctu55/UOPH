# Microservice Replication Guide for Remaining 8 Services

This guide provides the exact template and step-by-step instructions for your team to replicate the 5 generated services for the remaining 8 services.

---

## 📋 Services to Build (Recommended Order)

```
Priority 1 (Week 1):
├── 1. Notification Service     (No external dependencies)
├── 2. Search Service           (Elasticsearch integration)
└── 3. Analytics Service        (Aggregates from other services)

Priority 2 (Week 2):
├── 4. Pharmacy Service         (References Doctor + Patient)
├── 5. Hospital Service         (References User)
└── 6. Appointment Service      (Existing 100% - reference only)

Priority 3 (Week 3):
├── 7. Patient Service          (References User)
└── 8. Additional Services      (Auth enhancements, etc.)
```

---

## 🔨 Step-by-Step: Create a New Service

### Phase 1: Scaffolding (5 minutes)

```bash
# 1. Create directory structure
mkdir -p services/notification/src/notification/{entities,dto,migrations}

# 2. Copy bootstrap files
cp services/user/src/app.module.ts services/notification/src/app.module.ts
cp services/user/src/main.ts services/notification/src/main.ts
cp services/user/package.json services/notification/package.json
cp services/user/tsconfig.json services/notification/tsconfig.json
cp services/user/Dockerfile services/notification/Dockerfile
cp services/user/README.md services/notification/README.md
```

### Phase 2: Update Configuration (5 minutes)

**Update package.json:**
```json
{
  "name": "@upchar/notification-service",
  "description": "Notification service for UPCHAR",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "build": "nest build"
  }
}
```

**Update main.ts:**
```typescript
const port = process.env.PORT || 3004;  // Different port
app.setGlobalPrefix('api/v1');
```

**Update app.module.ts:**
```typescript
imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    // ... database config
  }),
  NotificationModule,  // Add your module
  HealthModule,
],
```

### Phase 3: Create Entity (15 minutes)

**File: `src/notification/entities/notification.entity.ts`**

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
  READ = 'read',
}

@Entity('notifications')
@Index(['userId'])
@Index(['status'])
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: NotificationStatus, default: NotificationStatus.PENDING })
  status: NotificationStatus;

  @Column({ type: 'varchar', nullable: true })
  recipient: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
```

**Key Points:**
- Use `@Entity('table_name')` to define table
- Add `@Index(['field'])` for searchable fields
- Use `@PrimaryGeneratedColumn('uuid')` for IDs
- Always include `@CreateDateColumn()` and `@UpdateDateColumn()`

### Phase 4: Create DTOs (10 minutes)

**File: `src/notification/dto/notification.dto.ts`**

```typescript
import { IsString, IsEmail, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recipient?: string;
}

export class UpdateNotificationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message?: string;
}

export class NotificationSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}
```

**Key Points:**
- Use class-validator decorators for validation
- Add @ApiProperty for Swagger documentation
- Create separate DTOs for Create, Update, Search

### Phase 5: Create Service (20 minutes)

**File: `src/notification/notification.service.ts`**

```typescript
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity, NotificationStatus } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    try {
      const notification = this.notificationRepository.create(dto);
      return await this.notificationRepository.save(notification);
    } catch (error) {
      this.logger.error(`Error creating notification: ${error.message}`);
      throw error;
    }
  }

  async getNotification(id: string): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async getUserNotifications(userId: string): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    const notification = await this.getNotification(id);
    notification.status = NotificationStatus.READ;
    notification.readAt = new Date();
    return await this.notificationRepository.save(notification);
  }

  async deleteNotification(id: string): Promise<{ message: string }> {
    await this.notificationRepository.delete(id);
    return { message: 'Notification deleted' };
  }

  // Add 5-7 more methods specific to your service
}
```

**Key Points:**
- Use `@Injectable()` decorator
- Use `@InjectRepository()` for database access
- Always handle errors with Logger.error()
- Return proper responses with messages

### Phase 6: Create Controller (15 minutes)

**File: `src/notification/notification.controller.ts`**

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create notification' })
  async createNotification(@Body() dto: CreateNotificationDto) {
    this.logger.log('Creating notification');
    return this.notificationService.createNotification(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification' })
  async getNotification(@Param('id') id: string) {
    return this.notificationService.getNotification(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user notifications' })
  async getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete notification' })
  async deleteNotification(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
```

**Key Points:**
- Use `@ApiTags()` for Swagger grouping
- Use `@ApiBearerAuth()` for protected endpoints
- Use proper HTTP codes (201 for create, 200 for get, etc.)
- Add `@ApiOperation()` for documentation

### Phase 7: Create Module (5 minutes)

**File: `src/notification/notification.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
```

**Key Points:**
- Always export the service for cross-module usage
- Import TypeOrmModule.forFeature for entities
- Register controller and service

### Phase 8: Database Migration (10 minutes)

**File: `src/migrations/[timestamp]-CreateNotificationTable.ts`**

```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificationTable1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['email', 'sms', 'push', 'in_app'],
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'message',
            type: 'text',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'sent', 'failed', 'read'],
            default: "'pending'",
          },
          {
            name: 'recipient',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'sentAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'readAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
        indices: [
          {
            columnNames: ['userId'],
          },
          {
            columnNames: ['status'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
```

### Phase 9: Test Service (10 minutes)

**File: `src/notification/notification.service.spec.ts`**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './entities/notification.entity';

describe('NotificationService', () => {
  let service: NotificationService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a notification', async () => {
    const dto = { userId: 'test-id', type: 'email', title: 'Test', message: 'Test message' };
    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 'notification-id', ...dto });

    const result = await service.createNotification(dto);
    expect(result).toEqual({ id: 'notification-id', ...dto });
  });
});
```

---

## 🎯 Template Checklist

When creating each new service, verify you have:

### ✅ Directory Structure
```
services/[service]/
├── src/
│   ├── [feature]/
│   │   ├── entities/[feature].entity.ts
│   │   ├── dto/[feature].dto.ts
│   │   ├── [feature].service.ts
│   │   ├── [feature].controller.ts
│   │   ├── [feature].module.ts
│   │   └── [feature].service.spec.ts
│   ├── migrations/
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

### ✅ Service Features
- [ ] Entity with TypeORM decorators
- [ ] DTOs with class-validator
- [ ] Service with 8-12 methods
- [ ] Controller with 6-10 endpoints
- [ ] Module binding
- [ ] Database migration
- [ ] Unit tests
- [ ] Swagger documentation

### ✅ Code Quality
- [ ] Error handling (NotFoundException, BadRequestException)
- [ ] Logging (Logger.log, Logger.error)
- [ ] Type safety (TypeScript)
- [ ] Validation decorators
- [ ] API documentation
- [ ] Comments on complex logic

---

## 📊 Estimated Effort per Service

| Service | Complexity | Time | Priority |
|---------|-----------|------|----------|
| Notification | Low | 5-6h | P1 |
| Search | Medium | 6-8h | P1 |
| Analytics | Medium | 5-7h | P1 |
| Pharmacy | Medium | 6-8h | P2 |
| Hospital | Low | 4-5h | P2 |
| Patient | Low | 4-5h | P3 |
| Appointment | Already 100% | 0h | Done |
| Additional | Low | 3-4h | P3 |

**Total Estimated Time:** 40-50 hours / 2 weeks with parallel development

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run migrations
npm run typeorm migration:run

# Start development
npm run start:dev

# Run tests
npm run test

# Build production
npm run build

# Start production
npm start
```

---

## 💡 Common Patterns to Reuse

### Error Handling Pattern
```typescript
try {
  // operation
} catch (error) {
  this.logger.error(`Error: ${error.message}`);
  throw new BadRequestException(error.message);
}
```

### Authorization Pattern
```typescript
async getResource(id: string, userId: string) {
  const resource = await this.repo.findOne({ where: { id } });
  if (!resource) throw new NotFoundException();
  if (resource.userId !== userId) throw new ForbiddenException();
  return resource;
}
```

### Search Pattern
```typescript
async search(dto: SearchDto): Promise<Entity[]> {
  const query = this.repo.createQueryBuilder('entity');
  
  if (dto.field) {
    query.andWhere('entity.field LIKE :field', { field: `%${dto.field}%` });
  }
  
  return query.orderBy('entity.createdAt', 'DESC').getMany();
}
```

---

## 📚 Reference Materials

Each generated service already has:
- ✅ Complete entity definitions
- ✅ Full DTO validation
- ✅ Service methods (8-12)
- ✅ Controller endpoints (6-10)
- ✅ Swagger documentation
- ✅ Error handling patterns

**Your team can copy-paste and adapt!**

---

## 🎓 Learning Resource

Follow this progression for team learning:

1. **Day 1:** Study User Service (simplest)
2. **Day 2:** Study Doctor Service (adds search)
3. **Day 3:** Study Telemedicine Service (complex flows)
4. **Day 4:** Create Notification Service (practice)
5. **Day 5+:** Build remaining services (independent)

---

## ✅ Validation Checklist

Before marking service complete:

```bash
# ✓ Compiles without errors
npm run build

# ✓ All tests pass
npm run test

# ✓ Linting passes
npm run lint

# ✓ Swagger docs load
# http://localhost:3000/api/docs

# ✓ Endpoints respond correctly
curl http://localhost:3000/api/health

# ✓ Database migrations run
npm run typeorm migration:run

# ✓ Ready for staging
docker build -t service-name:latest .
```

---

**You're ready to build! Start with the Notification Service and follow this guide.** 🚀
