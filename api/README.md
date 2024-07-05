# POC Server (dedicated)
This is component is built using Express
## Run with Bun
```console
bun install
bun run dev
```

## .env
```env
AUTH_SECRET="should match client secret"
DATABASE_URL="connection URL to database"
TRUSTED_CLIENT="client domain (for CORS)"
```