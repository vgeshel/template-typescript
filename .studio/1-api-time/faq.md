# Frequently Asked Questions

## Customer FAQ

### How do I use this endpoint?

Send an HTTP GET request to /api/time. The response is a JSON object containing a single field 'utc' with the current UTC time in ISO 8601 format. For example: {"utc": "2026-02-14T12:00:00.000Z"}. No headers, tokens, or authentication are required.

### What format is the timestamp in?

The timestamp is in ISO 8601 format (e.g., "2026-02-14T12:00:00.000Z"). This is the most widely supported and interoperable timestamp format, parseable by virtually every programming language and library.

### Do I need to authenticate to use this endpoint?

No. The endpoint is completely open and requires no authentication, API keys, or tokens. Anyone who can reach the server can call the endpoint.

### What HTTP methods are supported?

Only GET is supported. Other HTTP methods will not return time data.

### Is the time returned the server's local time or UTC?

The endpoint always returns UTC time, regardless of what timezone the server is configured in. This ensures consistency for all consumers regardless of their geographic location.

## Internal / Stakeholder FAQ

### Why a standalone REST endpoint rather than adding a tRPC procedure to the existing router?

The existing codebase uses tRPC for typed client-server communication within the application. However, a time endpoint is a general-purpose utility that should be consumable by any HTTP client without requiring tRPC client setup or SuperJSON deserialization. A plain REST endpoint with standard JSON is the right choice for maximum interoperability and simplicity.

### What are the risks of an unauthenticated endpoint?

The risk is minimal. The endpoint returns only the current time — it exposes no user data, application state, or sensitive information. The server's current time is not a secret. This is comparable to a health check endpoint, which is also unauthenticated in this codebase.

### What are we explicitly NOT doing with this endpoint?

We are not adding timezone conversion, time formatting options, historical time queries, NTP-like synchronization, or any parameterized behavior. The endpoint does one thing: return the current UTC time.

### How do we measure success?

The endpoint is successful if it reliably returns a valid ISO 8601 UTC timestamp with a 200 status code and application/json content type on every GET request. Functional correctness is the primary success metric for this utility endpoint.
