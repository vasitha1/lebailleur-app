# LeBailleur Backend API

A comprehensive property management platform backend built with NestJS, TypeORM, and PostgreSQL.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Owner, Manager, Tenant)
- Password management (change, reset)
- User registration and login

### Property Management
- Property CRUD operations
- Unit management within properties
- Property statistics and analytics
- Manager assignment to properties

### Tenant Management
- Tenant profile management
- Lease tracking
- Tenant status monitoring
- Tenant statistics

### Payment Processing
- Payment creation and tracking
- Multiple payment statuses (Pending, Paid, Overdue, Partial)
- Payment method support (Mobile Money, etc.)
- Automatic monthly payment generation
- Payment analytics and reporting

### Notifications
- Automated payment reminders
- Custom notification system
- Notification history tracking
- Email and SMS integration ready

### Analytics & Reporting
- Dashboard statistics
- Revenue analytics
- Occupancy trends
- Property performance metrics
- Payment collection analytics

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Environment**: dotenv

## Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd lebailleur-backend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Set up PostgreSQL database
\`\`\`bash
# Create database
createdb lebailleur
\`\`\`

5. Run the application
\`\`\`bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
\`\`\`

## API Documentation

Once the application is running, visit:
- API Documentation: http://localhost:3001/api/docs
- API Base URL: http://localhost:3001/api/v1

## Database Schema

The application uses the following main entities:
- **Users**: Authentication and user management
- **Properties**: Property information and management
- **Units**: Individual rental units within properties
- **Tenants**: Tenant profiles and lease information
- **Payments**: Payment tracking and processing

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/change-password` - Change password
- `POST /auth/reset-password` - Reset password
- `GET /auth/profile` - Get user profile

### Users
- `GET /users` - Get all users (Owner only)
- `GET /users/managers` - Get managers for owner
- `POST /users` - Create new user (Owner only)
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Owner only)

### Properties
- `GET /properties` - Get all properties
- `POST /properties` - Create property (Owner only)
- `GET /properties/stats` - Get property statistics
- `GET /properties/:id` - Get property by ID
- `PATCH /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property (Owner only)
- `POST /properties/:id/units` - Create unit in property
- `GET /properties/:id/units` - Get all units in property
- `GET /properties/:id/units/vacant` - Get vacant units

### Tenants
- `GET /tenants` - Get all tenants
- `POST /tenants` - Create new tenant
- `GET /tenants/stats` - Get tenant statistics
- `GET /tenants/by-status` - Get tenants by status
- `GET /tenants/:id` - Get tenant by ID
- `PATCH /tenants/:id` - Update tenant
- `DELETE /tenants/:id` - Delete tenant

### Payments
- `GET /payments` - Get all payments
- `POST /payments` - Create new payment
- `GET /payments/stats` - Get payment statistics
- `GET /payments/by-status` - Get payments by status
- `GET /payments/by-date-range` - Get payments by date range
- `POST /payments/generate-monthly` - Generate monthly payments
- `GET /payments/:id` - Get payment by ID
- `PATCH /payments/:id` - Update payment
- `POST /payments/:id/process` - Process payment
- `DELETE /payments/:id` - Delete payment

### Notifications
- `POST /notifications/payment-reminder` - Send payment reminder
- `POST /notifications/custom` - Send custom notification
- `GET /notifications/history` - Get notification history
- `GET /notifications/automatic-reminders` - Get automatic reminder settings
- `PATCH /notifications/automatic-reminders` - Update automatic reminders

### Analytics
- `GET /analytics/dashboard` - Get dashboard statistics
- `GET /analytics/revenue` - Get revenue analytics
- `GET /analytics/payments` - Get payment analytics
- `GET /analytics/occupancy-trends` - Get occupancy trends
- `GET /analytics/property-performance` - Get property performance

## Role-Based Access

### Owner
- Full access to all endpoints
- Can manage properties, tenants, payments
- Can assign and manage property managers
- Access to all analytics and reports

### Manager
- Access to assigned properties only
- Can manage tenants and payments for assigned properties
- Can send notifications to tenants
- Access to analytics for managed properties

### Tenant
- Access to own tenant profile and payments
- Can view payment history and make payments
- Limited update permissions on own profile

## Development

\`\`\`bash
# Run in development mode
npm run start:dev

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
\`\`\`

## Deployment

1. Set up production database
2. Configure environment variables
3. Build the application: `npm run build`
4. Start the application: `npm run start:prod`

