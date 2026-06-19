# Custom Next App

A simple React and Next.js Application

## Installation

### Install Packages
- `pnpm i`

#### Install and seed database
- `pnpm dlx prisma init --output ../app/generated/prisma`
- `pnpm dlx create-db`
- `pnpm dlx prisma migrate dev --name init`
- `pnpm dlx prisma generate`
- `npm install -g tsx`
- `pnpm dlx prisma db seed`

#### Open Prisma Studio
- `pnpm dlx prisma studio`

### Run the app locally
- `pnpm run dev`

## Links
- (https://www.prisma.io/docs/guides/frameworks/nextjs)[How to install Prisma on Next.JS]
