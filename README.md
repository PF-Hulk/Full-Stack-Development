# CS 465 Full Stack Development I

## Repository Purpose

This repository contains my CS 465 MEAN stack Travlr Getaways application. The project is developed across module branches so each branch preserves a major stage of the full stack application.

## Branch Guide

| Branch | Module | Status | Summary |
|---|---|---|---|
| `main` | Course overview | Active | Repository README and progress tracker. |
| `module1` | Module One | Complete | Express application shell with static Travlr HTML, CSS, and images rendered from the `public` folder. |
| `module2` | Module Two | Complete | Refactored the Express application into an MVC structure with server side routing, controllers, Handlebars views, and reusable partials. |
| `module4` | Module Four | Complete | Added MongoDB and Mongoose database access, the trip schema and model, seed data, and database verification. |
| `module5` | Module Five | Complete | RESTful trip API, parameterized endpoints, Postman testing, HTTP status handling, and an API-driven public travel page. |
| `module6` | Module Six | Complete | Angular administrator SPA with reusable components, reactive forms, full trip CRUD operations, API integration, and automated testing. |

## Module Progress Log

### Module 1 – Static HTML Express Website

#### Completed:
- Created an Express application using the Handlebars view engine.
- Added Travlr static HTML pages to the Express `public` folder.
- Added Travlr CSS and image assets to the appropriate static folders.
- Verified the site renders at `http://localhost:3000`.
- Pushed Module One work to the `module1` branch.

### Module 2 – MVC Routing and Handlebars Templates

#### Completed:
- Created and pushed the `module2` branch.
- Added the `app_server` folder to begin organizing the Express application with an MVC structure.
- Moved the existing `routes` and `views` folders into `app_server`.
- Created an `app_server/controllers` folder.
- Added `main.js` and `travel.js` controller files.
- Updated the home route to use the main controller.
- Added a travel route and travel controller for the `/travel` page.
- Updated `app.js` so Express uses the new `app_server/routes` and `app_server/views` paths.
- Converted `public/travel.html` into `app_server/views/travel.hbs`.
- Created reusable Handlebars partials for the header and footer.
- Registered the Handlebars partials directory in `app.js`.
- Moved `layout.hbs` into the `views/layouts` folder.
- Tested the application locally and verified `http://localhost:3000/travel` renders successfully through the MVC route, controller, and Handlebars template.

### Module 3 – Dynamic Templates with JSON Data

#### Completed:
- Created and pushed the `module3` branch.
- Added the `data` folder and the `data/trips.json` data file.
- Moved repeated trip information out of the Handlebars view and into JSON data.
- Updated the travel controller to read and parse the trip data.
- Passed the trip collection from the controller to `travel.hbs`.
- Replaced repeated trip markup with a Handlebars `each` loop.
- Used Handlebars expressions to render each trip's name, image, and description.
- Retained the MVC routes, controllers, layout, and reusable partials from Module 2.
- Verified that all trip information renders dynamically at `http://localhost:3000/travel`.
- Prepared the application for MongoDB, Mongoose models, and schemas in Module 4.

### Module 4 – MongoDB, Models, and Schemas

#### Completed:
- Created and pushed the `module4` branch.
- Installed Mongoose and added it to the project dependencies.
- Created `app_server/models/db.js` to manage the MongoDB connection.
- Added connection event monitoring, error handling, and graceful shutdown logic.
- Loaded the database module from `app.js`.
- Created `app_server/models/travlr.js`.
- Defined the required trip schema fields and created the Mongoose `trips` model.
- Indexed the trip `code` and `name` fields.
- Expanded `data/trips.json` to include the complete trip records.
- Created `app_server/models/seed.js`.
- Configured the seed script to delete existing trip documents and insert three records.
- Populated the `travlr` database and verified the `trips` collection with a database inspection tool.
- Preserved the existing MVC routes, Handlebars views, partials, and static assets.
- Prepared the application for RESTful API development in Module 5.


### Module 5 – RESTful API

#### Completed:
- Created a separate top-level `app_api` application.
- Moved Mongoose models and database access into `app_api/models`.
- Added API controllers and routes for trip retrieval.
- Implemented `GET /api/trips` to return all trips.
- Implemented `GET /api/trips/:tripCode` to return trips by code.
- Added `200`, `404`, and `500` HTTP status handling with JSON responses.
- Tested the collection, individual-trip, and invalid-code endpoints with Postman.
- Refactored the Express travel controller to use Node's built-in Fetch API.
- Removed direct filesystem access to `data/trips.json` from the customer-facing controller.
- Added response validation and error messaging to the Handlebars travel page.
- Verified that `/travel` retrieves and renders MongoDB trip data through the REST API.
- Pushed the completed RESTful API work to the `module5` branch.

### Module 6 – Angular Single-Page Application

#### Completed:
- Created and pushed the `module6` branch.
- Created the Angular administrator SPA in `app_admin`.
- Added Bootstrap styling and Travlr image assets to the Angular application.
- Created the Angular `Trip` interface.
- Developed the Trip Listing component to retrieve and display trip data.
- Refactored trip rendering into a reusable Trip Card component.
- Created `TripDataService` to communicate with the Express REST API.
- Added Angular client-side routing for the trip listing, Add Trip, and Edit Trip views.
- Created reactive Add Trip and Edit Trip forms with required-field validation.
- Added Delete functionality to individual trip cards.
- Added `POST`, `PUT`, and `DELETE` support to the Express REST API while preserving the existing `GET` endpoints.
- Added CORS support so the Angular application on port `4200` can communicate with the Express API on port `3000`.
- Verified that added and updated trips persist in MongoDB.
- Tested the REST endpoints using Postman.
- Added Angular tests using mock trip data.
- Passed all six Angular test files and nine tests.
- Completed a successful Angular production build.
- Pushed the completed Angular SPA work to the `module6` branch.

## Application Evolution

```text
Module 1: Static HTML served by Express
    ↓
Module 2: Express MVC routes, controllers, and Handlebars views
    ↓
Module 3: JSON data passed through the controller and rendered dynamically
    ↓
Module 4: MongoDB connection, Mongoose trip model, schema, and seed data
    ↓
Module 5: RESTful API endpoints and API-driven server-side rendering
    ↓
Module 6: Angular single-page administration application
    ↓
Module 7: Authentication and application security
```

## Current Architecture

```text
Customer Browser
    ↓
Express MVC Application (app_server)
    ↓ fetch()
REST API (app_api)
    ↓
Mongoose Models
    ↓
MongoDB travlr Database
```

Module Six adds a separate administrator SPA that uses the same REST API and MongoDB database:

```text
Administrator Browser
    ↓
Angular SPA (app_admin)
    ↓
TripDataService
    ↓ HTTP
REST API (app_api)
    ↓
Mongoose Models
    ↓
MongoDB travlr Database
```

## Current API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/trips` | Return all trip records as JSON. |
| `GET` | `/api/trips/:tripCode` | Return the trip matching the supplied code. |
| `POST` | `/api/trips` | Add a new trip record. |
| `PUT` | `/api/trips/:tripCode` | Update the trip matching the supplied code. |
| `DELETE` | `/api/trips/:tripCode` | Delete the trip matching the supplied code. |

## Local Setup

### Prerequisites

- Node.js
- npm
- MongoDB Community Server
- Angular CLI

### Install and Run

```powershell
cd "S:\travlr"
npm install
Get-Service MongoDB
npm start
```

Open the customer-facing application:

```text
http://localhost:3000
```

Open the dynamic travel page:

```text
http://localhost:3000/travel
```

Test the trip collection endpoint:

```text
http://localhost:3000/api/trips
```

Test one trip:

```text
http://localhost:3000/api/trips/GALR210214
```

### Run the Angular Administrator SPA

From a second PowerShell window:

```powershell
cd app_admin
npm install
ng serve
```

Open the administrator SPA:

```text
http://localhost:4200
```

Run the Angular tests:

```powershell
ng test --watch=false
```

Module Six test results:

```text
Test Files  6 passed (6)
Tests       9 passed (9)
```

Create a production build:

```powershell
ng build
```

## Current Technology Stack

- Node.js
- Express
- Handlebars
- MongoDB
- Mongoose
- RESTful APIs
- Fetch API
- Postman
- Git and GitHub
- Angular
- TypeScript
- Bootstrap
- Angular Router
- Angular Reactive Forms
- Angular HttpClient
- RxJS
- Vitest

## Current Project Status

The repository is complete through Module Five. The application now includes a customer-facing Express MVC website, dynamic Handlebars rendering, MongoDB persistence, Mongoose models, reusable RESTful trip endpoints, HTTP error handling, and an Express controller that consumes the API with `fetch()`.
