# Project Setup Guide

This guide provides comprehensive instructions to set up and run the project locally.

## Prerequisites

- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher (or your preferred package manager)
- **Supabase Account**: For database and authentication services

## 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone <repository-url>
cd dsa--ce-learning-hub-1
```

## 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Database Connection (optional, for Drizzle Kit)
DATABASE_URL=your-database-connection-string
```

- **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL.
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Your Supabase project's anonymous key.
- **`DATABASE_URL`**: Your database connection string (required for running Drizzle Kit migrations).

## 4. Set Up the Database

This project uses **Supabase** for its database and authentication. The database schema is managed with **Drizzle ORM**.

### Running Migrations

To apply the database schema, run the following command:

```bash
npm run drizzle-kit:push
```

## 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## API Endpoints

The backend is built with Next.js API routes. Key endpoints include:

- **Authentication**:
  - `POST /api/auth/login`
  - `POST /api/auth/signup`
  - `POST /api/auth/logout`
- **Data Fetching**:
  - `GET /api/subjects`
  - `GET /api/topics`
  - `GET /api/problems`
  - `GET /api/user-progress`

For a complete list of API endpoints and their usage, refer to the `API_REFERENCE.md` file.
