-- CreateEnum

CREATE TYPE "UserRole" AS ENUM ('admin', 'customer');

-- CreateEnum

CREATE TYPE "OrderStatus" AS ENUM (
    'pending',
    'shipped',
    'delivered'
);

-- CreateTable

CREATE TABLE
    "users" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'customer',
        "contactNo" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "profileImg" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "users_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "categories" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "categories_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "books" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "author" TEXT NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "genre" TEXT NOT NULL,
        "publicationDate" TEXT NOT NULL,
        "categoryId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "books_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "review_and_ratings" (
        "id" TEXT NOT NULL,
        "review" TEXT NOT NULL,
        "rating" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "bookId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "review_and_ratings_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "orders" (
        "id" TEXT NOT NULL,
        "status" "OrderStatus" NOT NULL DEFAULT 'pending',
        "userId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "orders_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "ordered_books" (
        "id" TEXT NOT NULL,
        "orderId" TEXT NOT NULL,
        "bookId" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

CONSTRAINT "ordered_books_pkey" PRIMARY KEY ("id") );

-- CreateIndex

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey

ALTER TABLE "books"
ADD
    CONSTRAINT "books_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "review_and_ratings"
ADD
    CONSTRAINT "review_and_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "review_and_ratings"
ADD
    CONSTRAINT "review_and_ratings_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "orders"
ADD
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "ordered_books"
ADD
    CONSTRAINT "ordered_books_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "ordered_books"
ADD
    CONSTRAINT "ordered_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;