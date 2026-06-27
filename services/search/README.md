# Search Service

This is the search service for the UPCHAR Healthcare System. It provides search functionality across hospitals and doctors.

## Features

- Search hospitals by name, city, or bio
- Search doctors by name, specialization, or bio
- Combined search across all entities
- Case-insensitive partial matching
- Pagination support (limits results to 20)

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

### Search
- `GET /search/hospitals?q={query}` - Search hospitals
- `GET /search/doctors?q={query}` - Search doctors
- `GET /search?q={query}` - Search across hospitals and doctors

## Technology Stack

- NestJS Framework
- TypeORM for database access
- PostgreSQL database
- Swagger for API documentation

## License

MIT