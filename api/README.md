# POC Server (dedicated)
This is component is built using Express
## Run with Bun
```console
bun install
bun run dev
```

## .env
```env
AUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3001
AUTH_TRUST_HOST=http://localhost:3001
DATABASE_URL=...
```