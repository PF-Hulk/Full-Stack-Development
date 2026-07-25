# CS 465 Full Stack Development I

## Repository Purpose

This repository contains my CS 465 MEAN stack Travlr Getaways application. The project is built across module branches so each branch represents a stage of full stack web application development.

## Branch Guide

| Branch | Module | Status | Summary |
|---|---|---|---|
| `main` | Course overview | Active | Repository README and progress tracker. |
| `module1` | Module One | Complete | Express application shell with static Travlr HTML, CSS, and images rendered from the `public` folder. |
| `module2` | Module Two | Complete | Refactored the Express application into an MVC structure with server side routing, controllers, Handlebars views, and reusable partials. |
| `module4` | Module Four | Complete | Added MongoDB and Mongoose database access, the trip schema and model, seed data, and database verification. |

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
Module 5: RESTful API
```

## Current Setup Notes

Run the project locally from the `travlr` folder:

```powershell
npm install
```

Make sure MongoDB is running, then populate the database:

```powershell
node .\app_server\models\seed.js
```

Start the Express application:

```powershell
$env:DEBUG="travlr:*"; npm start
```

Open the application:

```text
http://localhost:3000
```

Open the travel page:

```text
http://localhost:3000/travel
```

## Current Project Status

The repository is complete through Module 4. The application now includes an Express MVC structure, JSON-backed Handlebars rendering, a MongoDB connection, a validated Mongoose trip model, and a repeatable database seed process. The next branch will add RESTful API routes that retrieve trip data through the database layer.

