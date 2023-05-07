# API for Random Facts

This API allows users to retrieve random facts from a list of pre-defined facts. There are several endpoints available for accessing different types of facts.

## Dependencies

This API uses the following dependencies:

- `express` for creating the API server
- `express-rate-limit` for rate limiting the API
- `node-schedule` for scheduling tasks
- `cors` for allowing cross-origin requests

## Endpoints

The following endpoints are available for retrieving facts:

- `GET /fact` returns a random fact from the list
- `GET /fact/reqs` returns the number of requests made to the API
- `GET /fact/specify/:number` returns the fact at the specified index in the list
- `GET /fact/specify/count/:number` returns the specified number of facts, starting from the beginning of the list
- `GET /fact/specify/count/random/:number` returns the specified number of random facts
- `GET /fact/hourly` returns a random fact, selected every hour
- `GET /fact/app` returns a random fact for use in an app
- `GET /fact/hourly/app` returns a random fact for use in an app, selected every hour

## Development

To set up the development environment, follow these steps:

1. Clone the repository to your local machine
2. Run `npm install` to install the dependencies
3. Start the API server by running `node index.js`
4. The API will be running at `http://localhost:3000`

## Notes

- The `/fact/app` and `/fact/hourly/app` endpoints log the time that the fact was accessed in the console
- The `/fact/hourly` and `/fact/hourly/app` endpoints use a scheduling function to select a new fact at midnight every day
- The API is rate limited to 100 requests per 15 minutes for all endpoints
