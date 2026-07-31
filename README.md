# CS 465 Module 5: RESTful API

## Overview

This branch contains the Module Five version of the Travlr Getaways full stack application. The work refactors database access into a separate `app_api` layer, exposes RESTful endpoints for trip data, and updates the customer-facing Express website to retrieve trip records through the API.

This structure applies separation of concerns by keeping the public MVC website in `app_server` and the reusable API, Mongoose models, and database connection in `app_api`.

## Completed Work

- Created the top-level `app_api` application structure.
- Added API-specific `controllers` and `routes` folders.
- Moved the Mongoose models and database connection from `app_server/models` to `app_api/models`.
- Updated `app.js` to load the database from `app_api/models/db`.
- Mounted the API router at `/api`.
- Created an API controller that retrieves all trips with Mongoose `find()`.
- Created a parameterized API controller that retrieves trips by `tripCode`.
- Added JSON responses and HTTP status handling for successful, missing, and server-error conditions.
- Tested collection, individual-trip, and invalid-trip requests with Postman.
- Refactored `app_server/controllers/travel.js` to use Node's built-in Fetch API instead of reading `data/trips.json` directly.
- Added response validation and customer-facing error messages to the travel page.
- Updated trip image links so each image can open its individual API endpoint during development testing.
- Verified that the `/travel` page renders all three MongoDB trip records through the API.

## REST API Endpoints

| Method | Endpoint | Purpose | Expected Results |
|---|---|---|---|
| `GET` | `/api/trips` | Retrieve the complete collection of trips. | `200 OK` with a JSON array, `404 Not Found` when no trips exist, or `500 Internal Server Error` on a database failure. |
| `GET` | `/api/trips/:tripCode` | Retrieve the trip whose `code` matches the route parameter. | `200 OK` with matching trip JSON, `404 Not Found` when the code does not exist, or `500 Internal Server Error` on a database failure. |

### Valid Test Codes

- `GALR210214` — Gale Reef
- `DAWR210315` — Dawson's Reef
- `CLAR210621` — Claire's Reef

## Project Structure

```text
travlr/
├── app_api/
│   ├── controllers/
│   │   └── trips.js
│   ├── models/
│   │   ├── db.js
│   │   ├── seed.js
│   │   └── travlr.js
│   └── routes/
│       └── index.js
├── app_server/
│   ├── controllers/
│   │   ├── main.js
│   │   └── travel.js
│   ├── routes/
│   └── views/
├── data/
│   └── trips.json
├── public/
├── app.js
└── package.json
```

## Request Flow

```text
Browser requests /travel
    ↓
Express MVC travel route
    ↓
Travel controller calls GET /api/trips with fetch()
    ↓
API route maps the request to tripsList
    ↓
API controller queries MongoDB through the Trip model
    ↓
MongoDB returns trip documents
    ↓
API responds with JSON
    ↓
Travel controller passes the JSON array to travel.hbs
    ↓
Handlebars renders the customer-facing travel page
```

## Local Setup

### Prerequisites

- Node.js
- npm
- MongoDB Community Server running locally

### Install Dependencies

```powershell
cd "S:\travlr"
npm install
```

### Start MongoDB

MongoDB is configured as a Windows service in the development environment. Confirm that it is running:

```powershell
Get-Service MongoDB
```

### Start the Express Application

```powershell
npm start
```

Open the application:

```text
http://localhost:3000
```

Open the dynamic travel page:

```text
http://localhost:3000/travel
```

## API Testing

Retrieve all trips:

```text
GET http://localhost:3000/api/trips
```

Retrieve one trip:

```text
GET http://localhost:3000/api/trips/GALR210214
```

Test the not-found response:

```text
GET http://localhost:3000/api/trips/NOTREAL
```

Expected not-found response:

```json
{
  "message": "Trip with code NOTREAL was not found."
}
```

## Technology Used

- Node.js
- Express
- Handlebars
- MongoDB
- Mongoose
- RESTful API routing
- Fetch API
- Postman
- Git and GitHub

## Branch Status

Module Five is complete on the `module5` branch. The REST API, MongoDB retrieval, HTTP status handling, Postman testing, and API-driven public travel page have been implemented and verified.
