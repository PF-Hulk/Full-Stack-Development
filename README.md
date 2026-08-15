# CS 465 Module 6: Angular Single-Page Application

## Overview

This branch contains the Module Six version of the Travlr Getaways full stack application. Module Six adds an Angular single-page application (SPA) that provides an administrative interface for managing trip data.

The Angular administrator application communicates with the existing Express REST API and MongoDB database. Trip information can now be retrieved, added, updated, and deleted through the SPA while the existing Express application continues to provide the customer-facing website.

The Module Six implementation also introduces reusable Angular components, reactive forms, client-side routing, an Angular data service, Bootstrap styling, and automated component testing with mock data.

## Completed Work

- Created the Angular administrator SPA in `app_admin`.
- Configured Angular routing for the trip listing, Add Trip, and Edit Trip views.
- Added Bootstrap styling and copied Travlr image assets into the Angular application.
- Created a reusable `Trip` interface.
- Developed the `TripListingComponent` to retrieve and display trip data.
- Refactored trip rendering into the reusable `TripCardComponent`.
- Created `TripDataService` to communicate with the Express REST API.
- Implemented Angular HTTP requests for:
  - GET
  - POST
  - PUT
  - DELETE
- Created a reactive Add Trip form with required-field validation.
- Created a reactive Edit Trip form that loads existing trip data and saves updates.
- Added Delete functionality to individual trip cards.
- Added Angular routing between the trip listing, Add Trip, and Edit Trip screens.
- Updated the Express API to support complete CRUD operations.
- Added CORS configuration so the Angular application on port `4200` can communicate with the Express API on port `3000`.
- Verified that added and updated trips are persisted in MongoDB.
- Verified REST API functionality using Postman.
- Added Angular component tests using mock trip data.
- Successfully completed the Angular production build.
- Successfully passed all Angular tests.
- Pushed the completed work to the `module6` GitHub branch.

## Angular Application Structure

```text
app_admin/
├── src/
│   ├── app/
│   │   ├── add-trip/
│   │   │   ├── add-trip.component.html
│   │   │   ├── add-trip.component.spec.ts
│   │   │   └── add-trip.component.ts
│   │   ├── edit-trip/
│   │   │   ├── edit-trip.component.html
│   │   │   ├── edit-trip.component.spec.ts
│   │   │   └── edit-trip.component.ts
│   │   ├── models/
│   │   │   └── trip.ts
│   │   ├── services/
│   │   │   ├── trip-data.service.spec.ts
│   │   │   └── trip-data.service.ts
│   │   ├── trip-card/
│   │   │   ├── trip-card.component.html
│   │   │   ├── trip-card.component.spec.ts
│   │   │   └── trip-card.component.ts
│   │   ├── trip-listing/
│   │   │   ├── trip-listing.component.html
│   │   │   ├── trip-listing.component.spec.ts
│   │   │   └── trip-listing.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

## Trip Model

The Angular `Trip` interface represents the trip documents stored in MongoDB.

```typescript
export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: string | number;
  image: string;
  description: string;
}
```

## REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/trips` | Retrieve all trip records. |
| `POST` | `/api/trips` | Create a new trip. |
| `GET` | `/api/trips/:tripCode` | Retrieve a trip by its trip code. |
| `PUT` | `/api/trips/:tripCode` | Update an existing trip. |
| `DELETE` | `/api/trips/:tripCode` | Delete an existing trip. |

## SPA Request Flow

```text
Administrator Browser
        ↓
Angular SPA
        ↓
Angular Component
        ↓
TripDataService
        ↓ HTTP
Express REST API
        ↓
API Controller
        ↓
Mongoose Trip Model
        ↓
MongoDB travlr Database
```

## Full Application Architecture

```text
Customer Browser
        ↓
Express MVC Application
        ↓
REST API
        ↓
Mongoose
        ↓
MongoDB

Administrator Browser
        ↓
Angular SPA
        ↓
TripDataService
        ↓
REST API
        ↓
Mongoose
        ↓
MongoDB
```

## Angular Administrator Features

### Trip Listing

The Trip Listing component retrieves all trips through `TripDataService` and displays them using reusable Trip Card components.

Each trip card displays:

- Trip name
- Resort
- Trip length
- Price per person
- Image
- Description
- Edit Trip button
- Delete button

### Add Trip

The Add Trip component uses an Angular reactive form containing the following fields:

- Code
- Name
- Length
- Start
- Resort
- Per Person
- Image
- Description

Submitting the form sends a `POST` request to the REST API and stores the new trip in MongoDB.

### Edit Trip

The Edit Trip component retrieves the selected trip using its trip code and populates the reactive form with the existing values.

Submitting the form sends a `PUT` request to the REST API and updates the MongoDB document.

### Delete Trip

The Trip Card component provides a Delete button that sends a `DELETE` request to the API after user confirmation.

The deleted trip is then removed from the administrator interface.

## Local Setup

### Prerequisites

- Node.js
- npm
- MongoDB Community Server
- Angular CLI

### Install Express Dependencies

From the project root:

```powershell
npm install
```

### Install Angular Dependencies

```powershell
cd app_admin
npm install
```

### Confirm MongoDB Is Running

```powershell
Get-Service MongoDB
```

### Start the Express Application

From the Travlr project root:

```powershell
npm start
```

The Express application and REST API run at:

```text
http://localhost:3000
```

Customer-facing travel page:

```text
http://localhost:3000/travel
```

### Start the Angular Administrator SPA

Open another terminal:

```powershell
cd app_admin
ng serve
```

Open:

```text
http://localhost:4200
```

## API Testing

Examples:

### Retrieve All Trips

```text
GET http://localhost:3000/api/trips
```

### Retrieve One Trip

```text
GET http://localhost:3000/api/trips/GALR210214
```

### Add a Trip

```text
POST http://localhost:3000/api/trips
```

### Update a Trip

```text
PUT http://localhost:3000/api/trips/:tripCode
```

### Delete a Trip

```text
DELETE http://localhost:3000/api/trips/:tripCode
```

REST endpoints were verified with Postman during Module Six testing.

## Angular Testing

Run the Angular test suite from `app_admin`:

```powershell
ng test --watch=false
```

Final Module Six test results:

```text
Test Files  6 passed (6)
Tests       9 passed (9)
```

The tests include mock data and cover:

- Application component
- Trip Listing component
- Trip Card component
- Add Trip component
- Edit Trip component
- Trip Data service

## Production Build

Run:

```powershell
ng build
```

The Module Six Angular production build completes successfully.

## Technology Used

- Angular
- TypeScript
- HTML
- CSS
- Bootstrap
- Angular Reactive Forms
- Angular Router
- Angular HttpClient
- RxJS
- Vitest
- Node.js
- Express
- Handlebars
- MongoDB
- Mongoose
- RESTful APIs
- Postman
- Git
- GitHub

## Branch Status

Module Six is complete on the `module6` branch.

The completed branch includes:

- Angular administrator SPA
- Reusable Angular Trip components
- Trip data service
- Add Trip functionality
- Edit Trip functionality
- Delete Trip functionality
- Full REST CRUD support
- MongoDB persistence
- Postman API verification
- Angular mock-data tests
- Successful production build
