# Sip'n'Sync Event Registration App

## Overview
Sip'n'Sync is a modern web application for managing and registering for events. The application allows users to browse events, filter by category, and register for events they're interested in attending.

## Features
- Browse and search events
- Filter events by category
- View event details
- Register for events
- Google Sheets integration for registration data

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Google Sheets Integration

The application includes integration with Google Sheets to store event registration data. Follow these steps to set up the integration:

1. Follow the instructions in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) to create and configure your Google Sheet
2. Update the Google Script URL in `src/services/googleSheets.ts`
3. Test the integration by registering for an event

## Project Structure

```
src/
├── components/       # UI components
│   ├── events/       # Event-related components
│   ├── layout/       # Layout components
│   ├── sections/     # Page sections
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and constants
├── pages/            # Page components
├── services/         # API and external services
└── App.tsx           # Main application component
```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Deployment

To deploy the application:

1. Build the application:
   ```
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your hosting provider

## License

This project is licensed under the MIT License - see the LICENSE file for details.