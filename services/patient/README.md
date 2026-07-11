# Patient Service

This service handles patient-specific demographic information for the MedSphere EHR System.

## Features

- Create and manage patient profiles
- Link patients to user accounts
- Store demographic information (date of birth, gender, contact info, etc.)
- Track medical record numbers, insurance information, allergies, and chronic conditions
- Soft delete functionality (mark as deceased)

## API Endpoints

- `POST /patients` - Create a new patient profile
- `GET /patients/:id` - Get patient by ID
- `GET /patients/user/:userId` - Get patient by user ID
- `PUT /patients/:id` - Update patient information
- `DELETE /patients/:id` - Deactivate patient (soft delete)

## Database Schema

The patient entity includes fields for:
- Personal information (date of birth, gender)
- Contact information (phone, address, emergency contacts)
- Medical information (blood type, allergies, chronic conditions)
- Administrative information (medical record number, insurance, primary care physician)
- Deceased status tracking

## Integration

This service integrates with the User service via a one-to-one relationship using the userId field.