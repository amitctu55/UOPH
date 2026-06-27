# Notification Service

This is the notification service for the UPCHAR Healthcare System. It handles sending notifications via email, SMS, push notifications, and in-app messages.

## Features

- Create and manage notifications
- Send notifications via multiple channels (email, SMS, push, in-app)
- Schedule notifications for future delivery
- Track notification status (pending, sent, failed, read)
- Retrieve notifications by recipient with filtering options
- Mark notifications as read
- Get unread notification counts
- Integration with external service providers (Twilio for SMTP, FCM/APNS for push)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file based on `.env.example` and configure the environment variables.

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start
```

## API Endpoints

### Notifications
- `POST /notifications` - Create a new notification
- `GET /notifications?recipientId={id}` - Get notifications for a recipient
- `GET /notifications/{id}` - Get notification by ID
- `PUT /notifications/{id}` - Update notification
- `DELETE /notifications/{id}` - Delete notification
- `POST /notifications/{id}/read` - Mark notification as read
- `POST /notifications/{id}/send` - Send notification immediately
- `GET /notifications/unread-count/{recipientId}` - Get unread notification count

## Technology Stack

- NestJS Framework
- TypeORM for database access
- PostgreSQL database
- SMTP/email providers (configurable)
- SMS providers (Twilio, etc.)
- Push notification services (FCM, APNS)
- Swagger for API documentation

## License

MIT