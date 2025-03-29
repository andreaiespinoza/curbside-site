This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# then
npm run dev

```
Also, be sure to create a `.env.local` at the root of your directory with needed credentials for the application to run as expected.
```
NEXTAUTH_SECRET=
ADMIN_USER=
ADMIN_PASS=
NEXTAUTH_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Before making a PR make sure to test that application will build in prodcutin by running `npm run build`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

This application will deploy a temporary version of the application when you make a PR that you can check and validate in PROD before you merge it into main.
