# Current UTC Time API Endpoint

> Task: #1 - Add /api/time endpoint

## Goal

Provide developers with a simple, zero-configuration API endpoint that returns the current UTC time, enabling applications to retrieve server-authoritative time without external dependencies or authentication.

## User Stories

- **As a developer**, I want to make a single GET request to retrieve the current UTC time, so that I can synchronize timestamps across my application without relying on third-party time services.
- **As an API consumer**, I want the time response in a standard, parseable format (ISO 8601), so that I can use it reliably in any programming language or environment.
- **As a developer**, I want to access the time endpoint without authentication, so that I can use it immediately without setup overhead.

## Functionality

- The application exposes an API endpoint that returns the current UTC time.
- The endpoint responds to GET requests.
- The response is a JSON object containing a `utc` field with the current time as an ISO 8601 timestamp string.
- No authentication or authorization is required to access the endpoint.
- The response uses the standard JSON content type.

## Acceptance Criteria

- [ ] Developer can send a GET request to the time endpoint and receive a 200 OK response.
- [ ] Response body is valid JSON containing a `utc` field.
- [ ] The `utc` field value is a valid ISO 8601 formatted UTC timestamp (e.g., `2026-02-14T12:00:00.000Z`).
- [ ] The response Content-Type is `application/json`.
- [ ] The endpoint is accessible without any authentication or API keys.
- [ ] The returned timestamp reflects the actual current UTC time at the moment of the request.

## Out of Scope

- Timezone conversion or configurable time zones.
- Parameterized time formatting or alternate timestamp formats.
- Historical time queries or time arithmetic.
- Rate limiting or usage tracking for this endpoint.
- Authentication or access control.
