# Fidget Spinner E-commerce Micro-frontend Application

This is a micro-frontend e-commerce application for fidget spinners built using React, TypeScript, and Webpack Module Federation.

## Project Structure

- `container`: Main application shell
- `products`: Product listing micro-frontend
- `product-details`: Product details micro-frontend
- `cart`: Shopping cart micro-frontend
- `checkout`: Checkout process micro-frontend

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
```bash
npm start
```

This will start all micro-frontends concurrently:
- Container: http://localhost:3000
- Products: http://localhost:3001
- Product Details: http://localhost:3002
- Cart: http://localhost:3003
- Checkout: http://localhost:3004

## Features

- Product listing with pagination
- Detailed product view
- Shopping cart functionality
- Checkout process
- Order confirmation

## Build

To build all micro-frontends for production:

```bash
npm run build
```

## Technologies Used

- React
- TypeScript
- Webpack Module Federation
- React Router
- Material-UI 