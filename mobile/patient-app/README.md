# Patient Mobile App

This is the React Native mobile application for the UPCHAR Healthcare Platform, providing patients with access to healthcare services on their mobile devices.

## Features

- **Authentication**: Secure login and registration with biometric options (Face ID/Touch ID)
- **Dashboard**: Overview of upcoming appointments, health metrics, and urgent notifications
- **Appointments**: Schedule, reschedule, or cancel medical appointments
- **Telemedicine**: Join video consultations directly from the app
- **Medical Records**: View, download, and share your health records securely
- **Prescriptions**: View and renew prescriptions, find nearby pharmacies
- **Pharmacy**: Order medications for delivery or pickup
- **Wallet**: Manage healthcare spending account and payment methods
- **Notifications**: Receive appointment reminders, test results, and important health alerts
- **Chat**: Secure messaging with healthcare providers
- **Emergency**: Quick access to emergency services and medical ID

## Technology Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Navigation**: React Navigation
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **TypeScript**: For type safety and improved developer experience

## Screens

1. **Authentication**
   - Login Screen
   - Registration Screen
   - Forgot Password
   - Verify Email/Phone

2. **Main Tabs (Bottom Navigation)**
   - Home Dashboard
   - Appointments
   - Telemedicine
   - Medical Records
   - Pharmacy
   - Wallet
   - More (Profile, Settings, etc.)

3. **Modal/Full-Screen Screens**
   - Appointment Booking Flow
   - Video Consultation Interface
   - Prescription Details
   - Lab Results Viewer
   - Insurance Information
   - Emergency Contact Info

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator/Xcode (for iOS development)
- Android Studio/Android Emulator (for Android development)

### Setup

1. Clone the repository
2. Navigate to the mobile/patient-app directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Use the Expo Go app on your phone or an emulator to test

### Environment Variables

Create a `.env` file in the root of the mobile/patient-app directory:

```
EXPO_PUBLIC_API_URL=https://api.upchar.health
EXPO_PUBLIC_WS_URL=wss://ws.upchar.health
```

## Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

## Testing

```bash
# Unit tests
npm test

# End-to-end tests (with Detox)
npm run test:e2e
```

## Release Process

1. Ensure all tests pass
2. Update version in app.json and package.json
3. Create a git tag for the release
4. Build and submit to app stores via EAS