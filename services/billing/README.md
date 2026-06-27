# Billing Service

This is the billing service for the UPCHAR Healthcare System. It handles invoicing, payments, and wallet management for patients and healthcare providers.

## Features

- Invoice creation and management
- Payment processing
- Wallet management
- Payment history tracking
- Invoice status tracking (draft, issued, paid, overdue, etc.)

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

### Invoices
- POST `/billing/invoices` - Create a new invoice
- GET `/billing/invoices/:invoiceId` - Get invoice by ID
- GET `/billing/patients/:patientId/invoices` - Get all invoices for a patient
- PUT `/billing/invoices/:invoiceId/issue` - Issue a draft invoice

### Payments
- POST `/billing/invoices/:invoiceId/payments` - Process a payment for an invoice
- GET `/billing/patients/:patientId/payments` - Get payment history for a patient

### Wallet
- GET `/billing/wallets/:userId` - Get user wallet
- POST `/billing/wallets/:userId/add` - Add funds to wallet
- POST `/billing/wallets/:userId/deduct` - Deduct funds from wallet

## Testing

```bash
npm run test
```

## License

MIT