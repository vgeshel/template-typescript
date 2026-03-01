# Integration Contracts Index

## Internal Integrations

- **[tRPC API](trpc-api.md)** — Type-safe RPC interface between Next.js frontend and backend, including health check endpoint
- **[Logger Interface](logger-interface.md)** — Pino-based structured logging contract for application-wide logging

## External Integrations

- **[Environment Configuration](environment-config.md)** — Environment variable contracts for database connection and logging configuration via dotenvx

## Database Integrations

- **[Database Connection](database-connection.md)** — PostgreSQL connection contract via DATABASE_URL environment variable (implementation not included in template)

## Future Integrations

As the application grows, document contracts for:

- Third-party API integrations
- Webhook endpoints
- Event streaming systems
- External authentication providers
- Payment gateways
- Email services
