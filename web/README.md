# POC Client
This is component is built using Next.JS

## Run with Bun
```console
bun install
bun run dev
```

## .env
```env
DATABASE_URL="connection URL to database"
SERVER_URL=""

AUTH_SECRET="should match server secret"
NEXTAUTH_URL="this client's domain"
AUTH_TRUST_HOST="this client's domain"
```