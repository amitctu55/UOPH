# Medical Records Service

This is the Medical Records Service for the UPCHAR Healthcare System. It handles the storage, retrieval, and management of patient medical records.

## Features

- Upload and store medical records (prescriptions, lab reports, scans, etc.)
- Retrieve patient medical records with access control
- Share medical records with different access levels
- Download medical records
- Audit logging of all access to medical records
- Role-based access control (patients, doctors, hospital staff)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run the application:
   ```bash
   npm run start:dev
   ```

## API Endpoints

### Medical Records

- `POST /medical-records` - Upload a new medical record
- `GET /medical-records?patientId={id}` - Get all medical records for a patient
- `GET /medical-records/:recordId` - Get a specific medical record
- `GET /medical-records/:recordId/download` - Download a medical record file
- `PUT /medical-records/:recordId/share` - Share a medical record with specified access level
- `DELETE /medical-records/:recordId` - Delete a medical record (soft delete)
- `GET /medical-records/patient/{patientId}/type/{recordType}` - Get records by type for a patient
- `GET /medical-records/:recordId/access-log` - Get access log for a record

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT