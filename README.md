# ZappPay - Web Payment Application

## Overview

ZappPay is a React-based Web payment application prototype that simulates the functionality of a digital wallet. The application allows users to:

- Create an account and log in
- Add virtual money to their wallet
- Send money to other users
- Scan QR codes for payments
- View their transaction history
- Manage their profile

## Project Structure

The project is built with modern web technologies:

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **React Query** - Data fetching and state management

## Key Features

### Authentication

The app includes a complete authentication flow with:
- Registration
- Login
- Forgot password functionality

### Wallet Management

- View balance
- Add money to wallet
- Transaction history

### Money Transfer

- Send money to contacts
- QR code payment
- Transaction records

### User Profile

- View and edit profile information
- Update security settings

## Important Notes

- This is a **prototype/demo application** that simulates a payment system
- It uses localStorage for data persistence (no backend database)
- No real financial transactions are processed
- User authentication is simulated within the browser

## Data Flow

1. User authentication data is stored in localStorage under 'zappUser'
2. Transactions are stored in localStorage under 'zappTransactions'
3. The AuthContext provides auth state and user data to the app
4. Balance updates and transactions are handled through context methods

## Development

### Running the Project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Future Enhancements

To turn this into a production application, you would need to:

1. Implement a secure backend API
2. Add real database storage
3. Integrate with payment processors
4. Add proper security measures
5. Implement KYC (Know Your Customer) verification
6. Set up secure user authentication

## License

This project is created for demonstration purposes.

