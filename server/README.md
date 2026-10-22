# ShopNest Backend

ShopNest is an e-commerce backend built with Node.js, Express, MongoDB, Cloudinary, JWT authentication, and Nodemailer.

## Technologies

- Node.js and Express
- MongoDB with Mongoose
- JWT and bcryptjs authentication
- Cloudinary and Multer for product images
- Nodemailer for email notifications

## Backend Structure

```text
server/
├── config/             # Database and Cloudinary configuration
├── controller/         # Request handlers
├── middleware/         # Authentication, admin, and upload middleware
├── model/              # Mongoose models
├── routes/             # API routes
├── utils/              # Shared utilities
├── public/temp/        # Temporary uploaded files
├── app.js              # Express app and route registration
└── index.js            # Database connection and server startup
```

## Requirements

- Node.js 18 or newer
- MongoDB connection string
- Cloudinary account
- Gmail or SMTP credentials for order emails

## Installation

From this directory, install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

Start the development server:

```bash
npm run dev
```

The backend runs at `http://localhost:5000` by default.

## API Base URLs

| Feature | Base URL |
| --- | --- |
| Authentication | `/api/v1/auth` |
| Products | `/api/v1/products` |
| Orders | `/api/v1/orders` |
| Admin analytics | `/api/v1/analytics` |

## Authentication

Protected endpoints expect a JWT in the authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Administrator endpoints require a user with the `admin` role.

## API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/getusers
```

### Products

```http
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
```

Product creation and updates require `multipart/form-data` with the image field named `image`.

### Orders

```http
POST /api/v1/orders
GET  /api/v1/orders
GET  /api/v1/orders/myorders
PUT  /api/v1/orders/:id/Status
```

### Analytics

```http
GET /api/v1/analytics
```

This endpoint is restricted to authenticated administrators.

## Image Uploads

Multer temporarily stores product images in `public/temp` before they are uploaded to Cloudinary. Temporary files are removed after successful or failed uploads.

## Current Limitations

- Automated tests are not configured yet.
- Email delivery requires valid SMTP credentials.

## Security

- Keep `.env` out of version control.
- Never expose Cloudinary, JWT, database, or email secrets to clients.
- Use an app password or SMTP credential for email services.
