# # Build a Book Catalog Backend with PostgreSQL & Prisma

### Live Link: https://book-catalog-servers.vercel.app

### Application Routes:

#### Auth

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)

Signup Request body:

```json
{
  "name": "Jhon Doe",
  "email": "john@example.com",
  "password": "john123",
  "role": "admin",
  "contactNo": "1234567890",
  "address": "Dhaka, Bangladesh",
  "profileImg": "user.jpg"
}
```

#### User

- api/v1/users (GET)
- api/v1/users/e0d9f6f9-9c64-41a6-9819-6e1d6a7d0bf7 (Single GET) Include an id that is saved in my database
- api/v1/users/e0d9f6f9-9c64-41a6-9819-6e1d6a7d0bf7 (PATCH)
- api/v1/users/e0d9f6f9-9c64-41a6-9819-6e1d6a7d0bf7 (DELETE) Include an id that is saved in my database
- api/v1/profile (GET)

#### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/f590d8b7-6a93-4cf5-a592-adf486e83f32 (Single GET) Include an id that is saved in my database
- api/v1/categories/f590d8b7-6a93-4cf5-a592-adf486e83f32 (PATCH)
- api/v1/categories/f590d8b7-6a93-4cf5-a592-adf486e83f32 (DELETE) Include an id that is saved in my database

#### Book

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

#### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

#### Profile

- api/v1/profile (Get)
