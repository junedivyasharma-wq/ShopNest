# ShopNest

ShopNest is a full-stack e-commerce application with a React/Vite frontend and a Node.js/Express backend. It supports customer authentication, product browsing, cart management, checkout, order tracking, and an administrator dashboard.

## Screenshots

### User interface

<img width="1812" height="930" alt="Screenshot 2026-11-26 002103" src="https://github.com/user-attachments/assets/2030ae39-dcfb-4933-8e1c-16bd8470bbb5" />

<img width="1792" height="952" alt="Screenshot 2026-11-26 001853" src="https://github.com/user-attachments/assets/56cd2df2-8dd5-48c7-9157-5de53f0f6e3f" />

<img width="1785" height="927" alt="Screenshot 2026-11-26 001929" src="https://github.com/user-attachments/assets/0ba7c037-d068-4da6-b9a6-539d17255968" />

<img width="1783" height="930" alt="Screenshot 2026-11-26 002042" src="https://github.com/user-attachments/assets/d2a3e209-327c-4668-ac43-6f5ef3efb416" />

### Admin interface

<img width="1497" height="943" alt="Screenshot 2026-11-26 001748" src="https://github.com/user-attachments/assets/b04e2fcc-ca7f-4821-a0e0-6a1d3aca571f" />

<img width="1486" height="907" alt="Screenshot 2026-11-26 001804" src="https://github.com/user-attachments/assets/88816e00-5b6c-49a3-a278-0a0d94edcffd" />

<img width="1412" height="845" alt="Screenshot 2026-11-26 001815" src="https://github.com/user-attachments/assets/c0be603f-3af9-43ea-9f02-9ca9e6bd461f" />

<img width="1790" height="955" alt="Screenshot 2026-11-26 001837" src="https://github.com/user-attachments/assets/dd3defb5-a760-4f4b-868b-183e7dca01a6" />



## Tech stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Cloudinary image uploads
- Nodemailer for order confirmation emails

## Project structure

```text
shop-nest/
├── client/             # React/Vite frontend
├── server/             # Express/MongoDB backend
├── package.json        # Root development scripts
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database
- Cloudinary account for product images
- Gmail or SMTP credentials for order confirmation emails

## Installation

Install dependencies for the root project, server, and client:

```bash
npm install
```

The root `install` script runs installation in both `server` and `client`.

## Environment configuration

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

Keep `.env` out of version control. The email credentials are used for order confirmation emails; registration no longer sends an OTP email.

## Running the application

Run the backend and frontend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:server
npm run dev:client
```

The backend runs on `http://localhost:5000` by default. The Vite development server proxies `/api` requests to the backend.

## Production build

Build the frontend:

```bash
npm run build
```

Preview the frontend production build:

```bash
cd client
npm run preview
```

## Main API endpoints

All API routes use the `/api/v1` prefix.

| Feature | Endpoint |
| --- | --- |
| Register | `POST /auth/register` |
| Login | `POST /auth/login` |
| Users | `GET /auth/getusers` |
| Products | `/products` |
| Orders | `/orders` |
| Admin analytics | `GET /analytics` |

Protected endpoints require a JWT in the request authorization header. Administrator endpoints additionally require an administrator account.

## Authentication behavior

- New users register with a username, email, and password.
- Passwords are hashed before they are stored.
- Registration returns a JWT and logs the user in immediately.
- Registration does not generate or send an email OTP.
- Order confirmation emails continue to use the shared email utility.

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start client and server together |
| `npm run dev:server` | Start the backend with Nodemon |
| `npm run dev:client` | Start the Vite frontend |
| `npm run build` | Build the frontend |
| `cd client && npm run lint` | Run frontend ESLint |

## Notes

- Product images are temporarily stored in `server/public/temp` before being uploaded to Cloudinary.
- Automated tests are not currently configured.
