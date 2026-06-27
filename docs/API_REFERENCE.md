# UPCHAR Healthcare Platform - API Reference

**Version:** 1.0.0  
**Base URL:** `https://api.upchar.com`  
**Authentication:** Bearer JWT Token  

---

## Table of Contents

1. [Authentication](#authentication)
2. [Common Patterns](#common-patterns)
3. [Users API](#users-api)
4. [Doctors API](#doctors-api)
5. [Appointments API](#appointments-api)
6. [Consultations API](#consultations-api)
7. [Medical Records API](#medical-records-api)
8. [Prescriptions API](#prescriptions-api)
9. [Billing & Payments API](#billing--payments-api)
10. [Notifications API](#notifications-api)
11. [Error Codes](#error-codes)

---

## Authentication

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "patient@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "patient@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient",
    "avatar": "https://..."
  }
}
```

### Refresh Token
**POST** `/auth/refresh`

Request:
```json
{
  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response (200):
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### Register (Patient)
**POST** `/auth/register`

Request:
```json
{
  "email": "patient@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-15",
  "phone": "+1234567890",
  "gender": "M"
}
```

Response (201):
```json
{
  "id": "uuid",
  "email": "patient@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2026-06-22T10:00:00Z"
}
```

### OAuth2 Login (Google)
**POST** `/auth/oauth/google`

Request:
```json
{
  "idToken": "google_id_token_here"
}
```

Response (200):
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600,
  "user": { ... }
}
```

---

## Common Patterns

### Request Headers
All authenticated requests require:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Pagination
Endpoints supporting pagination accept:
```
?page=1&limit=20&sort=createdAt:desc
```

Response includes:
```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## Users API

### Get Current User Profile
**GET** `/users/profile`

Response (200):
```json
{
  "id": "uuid",
  "email": "patient@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-15",
  "gender": "M",
  "role": "patient",
  "emailVerified": true,
  "phoneVerified": true,
  "avatar": "https://...",
  "createdAt": "2026-06-22T10:00:00Z",
  "updatedAt": "2026-06-22T10:00:00Z"
}
```

### Update Profile
**PUT** `/users/profile`

Request:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+9876543210",
  "avatar": "https://..."
}
```

Response (200):
```json
{
  "id": "uuid",
  "email": "patient@example.com",
  "firstName": "John",
  "lastName": "Smith",
  "updatedAt": "2026-06-22T10:05:00Z"
}
```

### Change Password
**POST** `/users/change-password`

Request:
```json
{
  "oldPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

Response (200):
```json
{
  "message": "Password changed successfully"
}
```

### Enable MFA
**POST** `/users/mfa/enable`

Response (200):
```json
{
  "qrCode": "data:image/png;base64,...",
  "secret": "JBSWY3DPEBLW64TMMQ======",
  "backupCodes": ["ABCD-1234", "EFGH-5678", ...]
}
```

### Verify MFA Code
**POST** `/users/mfa/verify`

Request:
```json
{
  "code": "123456"
}
```

Response (200):
```json
{
  "verified": true,
  "message": "MFA enabled successfully"
}
```

---

## Doctors API

### Search Doctors
**GET** `/doctors/search`

Query Parameters:
```
?specialization=Cardiology&city=New%20York&rating=4&available=true&page=1&limit=20
```

Response (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "firstName": "Dr. Jane",
      "lastName": "Smith",
      "specialization": "Cardiology",
      "subSpecialization": "Interventional Cardiology",
      "qualifications": ["MBBS", "MD", "DM Cardiology"],
      "experienceYears": 10,
      "consultationFee": 500,
      "rating": 4.8,
      "totalRatings": 245,
      "isVerified": true,
      "hospital": {
        "id": "uuid",
        "name": "City Hospital",
        "city": "New York"
      },
      "availability": {
        "status": "available",
        "nextSlot": "2026-06-25T10:00:00Z"
      },
      "avatar": "https://..."
    }
  ],
  "pagination": { ... }
}
```

### Get Doctor Details
**GET** `/doctors/{doctorId}`

Response (200):
```json
{
  "id": "uuid",
  "userId": "uuid",
  "firstName": "Dr. Jane",
  "lastName": "Smith",
  "licenseNumber": "MD123456",
  "specialization": "Cardiology",
  "subSpecialization": "Interventional Cardiology",
  "qualifications": ["MBBS", "MD", "DM Cardiology"],
  "experienceYears": 10,
  "bio": "Experienced cardiologist...",
  "consultationFee": 500,
  "rating": 4.8,
  "totalRatings": 245,
  "isVerified": true,
  "hospitals": [ ... ],
  "schedule": {
    "monday": { "start": "09:00", "end": "17:00" },
    "tuesday": { "start": "09:00", "end": "17:00" }
  },
  "avatar": "https://..."
}
```

### Get Doctor Availability
**GET** `/doctors/{doctorId}/availability`

Query Parameters:
```
?date=2026-06-25
```

Response (200):
```json
{
  "doctorId": "uuid",
  "date": "2026-06-25",
  "availableSlots": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    ...
  ]
}
```

### Get Doctor Ratings & Reviews
**GET** `/doctors/{doctorId}/ratings`

Response (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "patientName": "John Doe",
      "rating": 5,
      "review": "Excellent doctor, very professional",
      "createdAt": "2026-06-20T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## Appointments API

### Book Appointment
**POST** `/appointments`

Request:
```json
{
  "patientId": "uuid",
  "doctorId": "uuid",
  "hospitalId": "uuid",
  "appointmentDate": "2026-06-25",
  "appointmentTime": "10:00",
  "appointmentType": "in-person",
  "reasonForVisit": "Regular checkup",
  "notes": "Please check blood pressure"
}
```

Response (201):
```json
{
  "id": "uuid",
  "patientId": "uuid",
  "doctorId": "uuid",
  "appointmentDate": "2026-06-25",
  "appointmentTime": "10:00",
  "appointmentType": "in-person",
  "status": "scheduled",
  "reasonForVisit": "Regular checkup",
  "createdAt": "2026-06-22T10:00:00Z"
}
```

### Get Appointment
**GET** `/appointments/{appointmentId}`

Response (200):
```json
{
  "id": "uuid",
  "patientId": "uuid",
  "doctorId": "uuid",
  "doctor": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "specialization": "Cardiology"
  },
  "appointmentDate": "2026-06-25",
  "appointmentTime": "10:00",
  "appointmentType": "in-person",
  "status": "scheduled",
  "reasonForVisit": "Regular checkup",
  "createdAt": "2026-06-22T10:00:00Z"
}
```

### List Patient Appointments
**GET** `/appointments/patient/{patientId}`

Query Parameters:
```
?status=scheduled&page=1&limit=20
```

Response (200):
```json
{
  "data": [ ... ],
  "pagination": { ... }
}
```

### Reschedule Appointment
**PUT** `/appointments/{appointmentId}/reschedule`

Request:
```json
{
  "appointmentDate": "2026-06-26",
  "appointmentTime": "14:00"
}
```

Response (200):
```json
{
  "id": "uuid",
  "appointmentDate": "2026-06-26",
  "appointmentTime": "14:00",
  "status": "scheduled"
}
```

### Cancel Appointment
**PUT** `/appointments/{appointmentId}/cancel`

Request:
```json
{
  "reason": "Doctor is unavailable"
}
```

Response (200):
```json
{
  "id": "uuid",
  "status": "cancelled",
  "cancelledAt": "2026-06-22T10:30:00Z",
  "cancellationReason": "Doctor is unavailable"
}
```

---

## Consultations API

### Start Telemedicine Consultation
**POST** `/consultations/start`

Request:
```json
{
  "appointmentId": "uuid"
}
```

Response (200):
```json
{
  "id": "uuid",
  "appointmentId": "uuid",
  "patientId": "uuid",
  "doctorId": "uuid",
  "sessionToken": "token123...",
  "roomId": "room_123",
  "videoProvider": "twilio",
  "status": "in-progress",
  "startedAt": "2026-06-25T10:00:00Z"
}
```

### Get Consultation Details
**GET** `/consultations/{consultationId}`

Response (200):
```json
{
  "id": "uuid",
  "appointmentId": "uuid",
  "patientId": "uuid",
  "doctorId": "uuid",
  "status": "completed",
  "startedAt": "2026-06-25T10:00:00Z",
  "endedAt": "2026-06-25T10:30:00Z",
  "durationSeconds": 1800,
  "notes": "Consultation notes here"
}
```

### End Consultation
**POST** `/consultations/{consultationId}/end`

Request:
```json
{
  "notes": "Patient advised to take medication",
  "followUpRequired": true,
  "followUpDate": "2026-07-25"
}
```

Response (200):
```json
{
  "id": "uuid",
  "status": "completed",
  "endedAt": "2026-06-25T10:30:00Z"
}
```

---

## Medical Records API

### Upload Medical Record
**POST** `/medical-records/upload`

Form Data:
```
file: <binary file>
recordType: prescription
title: Heart Check Report
description: Cardiac examination report
```

Response (201):
```json
{
  "id": "uuid",
  "patientId": "uuid",
  "recordType": "prescription",
  "title": "Heart Check Report",
  "description": "Cardiac examination report",
  "fileUrl": "https://...",
  "fileName": "heart_report.pdf",
  "fileSizeMB": 2.5,
  "isEncrypted": true,
  "createdAt": "2026-06-22T10:00:00Z"
}
```

### Get Medical Records
**GET** `/medical-records`

Query Parameters:
```
?recordType=prescription&page=1&limit=20
```

Response (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "recordType": "prescription",
      "title": "Heart Check Report",
      "description": "Cardiac examination report",
      "fileUrl": "https://...",
      "fileSizeMB": 2.5,
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Download Medical Record
**GET** `/medical-records/{recordId}/download`

Response: Binary file download

### Delete Medical Record
**DELETE** `/medical-records/{recordId}`

Response (204): No content

---

## Prescriptions API

### Create Prescription
**POST** `/prescriptions`

Request:
```json
{
  "appointmentId": "uuid",
  "patientId": "uuid",
  "items": [
    {
      "medicineName": "Aspirin",
      "dosage": "100mg",
      "frequency": "Once daily",
      "durationDays": 30,
      "quantity": 30,
      "instructions": "Take after meals"
    }
  ],
  "notes": "Take regularly for heart health",
  "validUntilDays": 90
}
```

Response (201):
```json
{
  "id": "uuid",
  "appointmentId": "uuid",
  "patientId": "uuid",
  "issuedAt": "2026-06-22T10:00:00Z",
  "validUntil": "2026-09-20",
  "status": "issued",
  "items": [ ... ]
}
```

### Get Prescription
**GET** `/prescriptions/{prescriptionId}`

Response (200):
```json
{
  "id": "uuid",
  "prescriptionNumber": "RX-2026-001",
  "doctor": { ... },
  "patient": { ... },
  "items": [ ... ],
  "issuedAt": "2026-06-22T10:00:00Z",
  "validUntil": "2026-09-20",
  "status": "issued"
}
```

### List Patient Prescriptions
**GET** `/prescriptions/patient/{patientId}`

Response (200):
```json
{
  "data": [ ... ],
  "pagination": { ... }
}
```

---

## Billing & Payments API

### Create Bill
**POST** `/bills`

Request:
```json
{
  "patientId": "uuid",
  "appointmentId": "uuid",
  "items": [
    {
      "description": "Consultation Fee",
      "amount": 500
    },
    {
      "description": "Lab Tests",
      "amount": 1000
    }
  ],
  "taxPercent": 18,
  "discountPercent": 5
}
```

Response (201):
```json
{
  "id": "uuid",
  "billNumber": "INV-2026-001",
  "patientId": "uuid",
  "subtotal": 1500,
  "taxAmount": 270,
  "discountAmount": 75,
  "totalAmount": 1695,
  "status": "unpaid",
  "issuedAt": "2026-06-22T10:00:00Z",
  "dueDate": "2026-07-22"
}
```

### Get Bill
**GET** `/bills/{billId}`

Response (200):
```json
{
  "id": "uuid",
  "billNumber": "INV-2026-001",
  "patient": { ... },
  "items": [ ... ],
  "totalAmount": 1695,
  "status": "unpaid"
}
```

### Process Payment
**POST** `/payments`

Request:
```json
{
  "billId": "uuid",
  "amount": 1695,
  "paymentMethod": "credit_card",
  "paymentGateway": "stripe",
  "cardToken": "tok_123456789"
}
```

Response (201):
```json
{
  "id": "uuid",
  "billId": "uuid",
  "amount": 1695,
  "status": "completed",
  "transactionId": "txn_123456789",
  "paidAt": "2026-06-22T10:05:00Z"
}
```

### Get Wallet Balance
**GET** `/wallet/balance`

Response (200):
```json
{
  "patientId": "uuid",
  "balance": 5000,
  "currency": "INR",
  "lastUpdated": "2026-06-22T10:00:00Z"
}
```

### Add Wallet Balance
**POST** `/wallet/add-balance`

Request:
```json
{
  "amount": 2000,
  "paymentMethod": "credit_card"
}
```

Response (201):
```json
{
  "transactionId": "uuid",
  "amount": 2000,
  "newBalance": 7000,
  "createdAt": "2026-06-22T10:00:00Z"
}
```

---

## Notifications API

### Get Notifications
**GET** `/notifications`

Query Parameters:
```
?status=unread&page=1&limit=20
```

Response (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Appointment Confirmed",
      "content": "Your appointment with Dr. Smith is confirmed",
      "notificationType": "appointment",
      "isRead": false,
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Mark Notification as Read
**PUT** `/notifications/{notificationId}/read`

Response (200):
```json
{
  "id": "uuid",
  "isRead": true,
  "readAt": "2026-06-22T10:05:00Z"
}
```

### Mark All as Read
**PUT** `/notifications/mark-all-read`

Response (200):
```json
{
  "message": "All notifications marked as read"
}
```

### Delete Notification
**DELETE** `/notifications/{notificationId}`

Response (204): No content

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Missing or invalid authentication token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists or state conflict |
| INTERNAL_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |
| SLOT_UNAVAILABLE | 400 | Appointment slot is not available |
| INVALID_TOKEN | 401 | Token is expired or invalid |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |

---

## Rate Limiting

All endpoints are rate-limited:
- **Default:** 100 requests per minute per user
- **Authentication endpoints:** 10 requests per minute per IP
- **Admin endpoints:** 50 requests per minute

Response headers indicate rate limit status:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1234567890
```

---

## Webhooks

### Appointment Webhook
Sent when appointment status changes:

```json
{
  "event": "appointment.created",
  "data": {
    "appointmentId": "uuid",
    "patientId": "uuid",
    "doctorId": "uuid",
    "status": "scheduled",
    "appointmentDate": "2026-06-25"
  },
  "timestamp": "2026-06-22T10:00:00Z"
}
```

### Payment Webhook
Sent when payment is processed:

```json
{
  "event": "payment.completed",
  "data": {
    "paymentId": "uuid",
    "billId": "uuid",
    "amount": 1695,
    "status": "completed"
  },
  "timestamp": "2026-06-22T10:05:00Z"
}
```

---

**API Documentation Version:** 1.0  
**Last Updated:** 2026-06-22  
**Next Review:** 2026-07-22

For support, contact: support@upchar.com
