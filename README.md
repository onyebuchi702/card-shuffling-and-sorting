# Card Shuffling and Sorting Application

A full-stack TypeScript application that provides an interactive card deck management system with shuffling, sorting, and visualization capabilities.

##  What This Application Does

This application simulates a standard 52-card deck with the following features:
- **View Deck**: Display all cards in a beautiful grid layout
- **Shuffle Cards**: Randomize the deck order using Fisher-Yates algorithm
- **Sort Cards**: Sort by rank-then-suit or suit-then-rank
- **Reset Deck**: Return to original ordered state
- **Real-time Updates**: Live status tracking and notifications
- **Responsive Design**: Works on desktop and mobile devices

## Architecture Overview

This is a **monorepo** containing two main applications:

```
card-shuffling-and-sorting/
├──  server/                      # Express.js REST API (Port 3001)
│   ├── src/
│   │   ├── index.ts              # Main server with Express routes
│   │   ├── types/                # TypeScript type definitions
│   │   ├── constants/            # Sort methods and constants
│   │   └── utils/                # Card utilities and algorithms
│   ├── dist/                     # Compiled JavaScript output
│   ├── package.json
│   └── tsconfig.json
├── client/                       # React Frontend App (Port 3000)
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API service layer
│   │   ├── types/                # TypeScript interfaces
│   │   ├── styles/               # SCSS stylesheets
│   │   └── App.tsx               # React App
│   ├── public/                   # Static assets
│   ├── build/                    # Production build output
│   ├── package.json
│   └── tsconfig.json
├── node_modules/                 # Root dependencies
├── package.json                  # Root package with scripts
└── README.md                     # README
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)

### Option 1: Run Both Apps Simultaneously (Recommended)
```bash
yarn install:all
yarn dev
```

This will:
- Start the backend server on `http://localhost:3001`
- Start the React frontend on `http://localhost:3000`
- Open your browser automatically to the frontend

### Option 2: Run Apps Separately

#### Backend Server
```bash
cd server
yarn install
yarn dev           # Development with auto-reload
# OR
yarn build         # Build for production
yarn start         # Run production build
```

#### Frontend Client
```bash
cd client
yarn install
yarn start         # Development server
# OR
yarn build         # Build for production
yarn preview       # Preview production build
```

## 🧪 Testing

This project has test coverage for both frontend and backend.

### Run All Tests
```bash
# Test both client and server
yarn test:all

# Test with coverage reports
yarn test:coverage
```

### Backend Testing
```bash
cd server
yarn test                    # Run all tests
yarn test --coverage        # Run with coverage
yarn test --watch           # Run in watch mode
```

### Frontend Testing
```bash
cd client
yarn test                    # Run all tests
yarn test --coverage        # Run with coverage
yarn test --watchAll        # Run in watch mode
```

## How to Use the Application

1. **Start the application** using the quick start guide above
2. **Open your browser** to `http://localhost:3000`
3. **Interact with the deck:**
   - **Shuffle**: Click "Shuffle Deck" to randomize card order
   - **Sort**: Click "Sort Deck" to organize cards (method chosen randomly)
   - **Reset**: Click "Reset Deck" to return to original order
   - **Refresh**: Use the refresh button to reload the current state

## Configuration

### Environment Variables

The application supports the following environment variables:

**Frontend (Client):**
- `REACT_APP_API_URL` - Override the default API URL (default: `/api`)

**Backend (Server):**
- `PORT` - Server port (default: `3001`)
- `NODE_ENV` - Environment mode (`development`, `production`, `test`)

### Example .env Files

**Client (.env.local):**
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

**Server (.env):**
```bash
PORT=3001
NODE_ENV=development
```

## API Documentation

The backend provides a REST API with the following endpoints:

### `GET /api/deck`
Get the current deck state
```json
{
  "success": true,
  "deck": [...],
  "count": 52
}
```

### `POST /api/shuffle`
Shuffle the deck randomly
```json
{
  "success": true,
  "deck": [...],
  "action": "shuffled"
}
```

### `POST /api/sort`
Sort the deck (random method selection)
```json
{
  "success": true,
  "deck": [...],
  "action": "sorted",
  "method": "rank_then_suit"
}
```

### `POST /api/reset`
Reset deck to original order
```json
{
  "success": true,
  "deck": [...],
  "action": "reset"
}
```

## Development

### Tech Stack

**Backend:**
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Jest** - Testing framework
- **Supertest** - API testing
- **CORS** - Cross-origin requests

**Frontend:**
- **React** - UI framework
- **TypeScript** - Type safety
- **SCSS** - Styling
- **Jest & React Testing Library** - Testing
- **Custom Hooks** - State management

### Key Features

**State Management:**
- Server maintains deck state in memory
- Client uses custom hooks for API integration
- Real-time status updates and notifications

**UI/UX:**
- Responsive card grid layout
- Loading states and error handling
- Visual feedback for all actions
- Accessibility features

**Quality Assurance:**
- Comprehensive test suites
- Type safety with TypeScript
- Error boundaries and handling
- Code formatting with Prettier

### Scripts Reference

**Root Level:**
- `yarn dev` - Start both apps in development
- `yarn client` - Start only frontend
- `yarn server` - Start only backend

**Server:**
- `yarn dev` - Development with auto-reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Run production build
- `yarn test` - Run tests
- `yarn lint` - Lint code
- `yarn format` - Format code

**Client:**
- `yarn start` - Development server
- `yarn build` - Production build
- `yarn test` - Run tests
- `yarn eject` - Eject from Create React App

## 🔧 Troubleshooting

**Tests Failing:**
```bash
# Clear test cache
yarn test --clearCache
cd client && yarn test --clearCache
cd server && yarn test --clearCache
```