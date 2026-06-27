# Patient Dashboard

This is the patient-facing dashboard for the UPCHAR Healthcare Platform. It provides patients with access to their health information, appointment scheduling, medical records, and more.

## Features

- **Dashboard Overview**: View upcoming appointments, recent activity, and key health metrics
- **Appointment Management**: Schedule, view, and manage medical appointments
- **Medical Records**: Securely view, upload, and share medical documents
- **Pharmacy**: Browse medications and manage prescriptions
- **Wallet**: View balance and transaction history for healthcare payments
- **Consultations**: Join and manage telemedicine video consultations
- **Notifications**: View and manage platform notifications
- **Settings**: Manage profile, preferences, and account settings
- **Chat**: Communicate with healthcare providers and support staff

## Technology Stack

- **React 18**: Frontend library for building user interfaces
- **React Router v6**: Navigation and routing
- **Zustand**: Lightweight state management for authentication
- **TanStack Query (React Query)**: Data fetching, caching, and state synchronization
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP client for API requests
- **date-fns**: Date formatting and manipulation
- **CSS Modules**: Scoped styling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## API Integration

This dashboard is designed to work with the UPCHAR backend microservices:
- Auth Service: `/api/auth/*`
- User Service: `/api/users/*`
- Appointment Service: `/api/appointments/*`
- Medical Records Service: `/api/medical-records/*`
- Pharmacy Service: `/api/pharmacy/*`
- Billing Service: `/api/billing/*`
- Notification Service: `/api/notifications/*`
- Chat Service: `/api/chat/*`

## Project Structure

```
src/
├── App.tsx                 # Main application component with routing
├── App.css                 # Global styles
├── pages/                  # Page components
│   ├── DashboardPage.tsx   # Patient dashboard overview
│   ├── AppointmentsPage.tsx# Appointment management
│   ├── MedicalRecordsPage.tsx # Medical records view
│   ├── ...                 # Other page components
│   └── RegisterPage.tsx    # User registration page
├── components/             # Reusable UI components
├── store/                  # State management (Zustand)
│   └── useAuthStore.ts     # Authentication state
├── hooks/                  # Custom React hooks
├── services/               # API service layers
│   └── api.ts              # API client configuration
├── utils/                  # Utility functions
└── styles/                 # CSS modules and global styles
```

## Authentication

The application uses JWT-based authentication. Upon login, the auth service returns an access token that is stored in localStorage and sent with each API request as a Bearer token.

Authentication state (user info and token) is managed using Zustand in `src/store/useAuthStore.ts`.

## State Management

- **Authentication State**: Managed with Zustand (`useAuthStore`)
- **Server State**: Managed with TanStack Query (React Query) for data fetching, caching, and synchronization
- **UI State**: Managed with React's built-in useState and useReducer hooks

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload when you make changes.

### `npm build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency and transfer all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project so you have full control over them.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `REACT_APP_API_URL`: Base URL for the backend API
- `REACT_APP_WS_URL`: WebSocket URL for real-time features
- `REACT_APP_GOOGLE_MAPS_API_KEY`: Google Maps API key (for pharmacy locator)
- Feature flags: `REACT_APP_ENABLE_TELEMEDICINE`, `REACT_APP_ENABLE_CHAT`, `REACT_APP_ENABLE_NOTIFICATIONS`

See `.env.example` for default values.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.