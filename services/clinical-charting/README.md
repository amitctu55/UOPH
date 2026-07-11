# Clinical Charting Service

This service handles clinical charting data for the MedSphere EHR System, including vital signs, medications, allergies, immunizations, lab results, clinical notes, and treatment plans.

## Features

- Create, read, update, and deactivate clinical charting entries
- Support for multiple clinical data types:
  - Vital Signs
  - Medications
  - Allergies
  - Immunizations
  - Lab Results
  - Clinical Notes
  - Treatment Plans
- Access logging for audit trails (HIPAA compliance)
- Soft delete implementation for data retention requirements
- Role-based access control
- Automatic encryption of sensitive data
- Structured data storage using JSONB for flexibility
- RESTful API with Swagger/OpenAPI documentation

## API Endpoints

### Clinical Charting Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/clinical-charting` | Create new clinical charting entry |
| GET | `/clinical-charting/:id` | Get clinical charting entry by ID |
| GET | `/clinical-charting/patient/:patientId` | Get all clinical charting entries for a patient |
| GET | `/clinical-charting/patient/:patientId/type/:type` | Get clinical charting entries by type for a patient |
| PUT | `/clinical-charting/:id` | Update clinical charting entry |
| DELETE | `/clinical-charting/:id` | Deactivate (soft delete) clinical charting entry |

## Data Model

The clinical charting entity includes:

- `id`: Unique identifier (UUID)
- `patientId`: Reference to the patient
- `providerId`: ID of the healthcare provider who recorded the data
- `encounterId`: Optional reference to a specific visit/encounter
- `clinicalDataType`: Type of clinical data (vital signs, medication, etc.)
- `title`: Brief title/summary
- `description`: Detailed description or notes
- `data`: Structured data stored as JSONB for flexibility
- `recordedAt`: Timestamp when the data was measured/recorded
- `isActive`: Flag for tracking current vs historical data
- `accessLog`: Array of access audit entries
- `createdAt`, `updatedAt`: Timestamps
- `deletedAt`: Soft delete timestamp

## Security Features

- JWT-based authentication
- Role-based access control
- Audit logging for all access attempts
- Data encryption at rest
- Input validation and sanitization
- Protection against common vulnerabilities (SQL injection, XSS, etc.)

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (copy from `.env.example`):
   - Database connection settings
   - JWT secret
   - Port configuration

3. Run migrations:
   ```bash
   npm run typeorm:migration:run
   ```

4. Start the service:
   ```bash
   npm run start:dev  # Development
   npm run start:prod # Production
   ```

## Testing

- Unit tests: `npm run test`
- Test coverage: `npm run test:cov`
- End-to-end tests: `npm run e2e`

## API Documentation

Once running, visit `/api` to view the Swagger UI documentation.

## Data Privacy & Compliance

This service is designed to support HIPAA compliance through:
- Access logging and audit trails
- Minimum necessary access controls
- Data encryption at rest and in transit
- Secure authentication and authorization
- Regular security assessments

## License

Proprietary - MedSquare EHR System