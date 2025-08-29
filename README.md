# Setup Guide

Follow these steps to set up the project:

1. **Install dependencies**
    ```bash
    pnpm install
    ```

2. **Configure environment variables**
    - Copy `.env.example` to `.env`.
    - Add your credentials for the following variables in `.env`:
      - `DATABASE_URL`
      - `BETTER_AUTH_SECRET`

3. **Run database migrations**
    ```bash
    pnpm prisma migrate deploy
    ```

4. **Create a dummy user for login**
    ```bash
    pnpx tsx src/scripts/registerUsers.tsx
    ```

5. **Start the development server**
    ```bash
    pnpm run dev
    ```