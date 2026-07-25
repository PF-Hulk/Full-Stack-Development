# Travlr Getaways — Module 4

This branch contains the Module 4 version of the Travlr Getaways website for **CS 465: Full Stack Development I**.

Module 4 adds the database foundation for the Travlr Getaways application. The project now uses **MongoDB** and **Mongoose** to establish a database connection, define a validated trip schema, and populate a `trips` collection from the existing JSON data.

## Module Goals

- Install and configure Mongoose
- Connect the Express application to a MongoDB database
- Create a reusable database access module
- Define the trip schema and Mongoose model
- Expand the trip seed data to match the schema
- Populate the MongoDB `trips` collection
- Verify the stored documents with a database inspection tool
- Preserve the completed work in the `module4` GitHub branch

## Technologies Used

- Node.js
- Express
- JavaScript
- MongoDB
- Mongoose
- Handlebars
- JSON
- HTML
- CSS
- Git and GitHub

## Completed Work

- Installed Mongoose and added it to the project dependencies
- Created `app_server/models/db.js`
- Configured the application to connect to the local `travlr` MongoDB database
- Added database connection, error, disconnection, and graceful-shutdown handling
- Loaded the database module from `app.js`
- Created `app_server/models/travlr.js`
- Defined the trip schema with required validation
- Added indexes to the trip `code` and `name` fields
- Created the Mongoose `trips` model
- Expanded `data/trips.json` to include all required schema fields
- Created `app_server/models/seed.js`
- Configured the seed script to remove existing trip documents and insert the JSON seed data
- Populated the database with three trip documents
- Verified the `travlr` database and `trips` collection with a database inspection tool
- Preserved the MVC routes, Handlebars templates, partials, and static assets from earlier modules

## Database Integration Flow

```text
Express application starts
          ↓
app.js loads app_server/models/db.js
          ↓
Mongoose connects to mongodb://127.0.0.1/travlr
          ↓
db.js loads the trip model
          ↓
travlr.js defines the schema and trips model
          ↓
seed.js reads data/trips.json
          ↓
Existing trip documents are removed
          ↓
Three trip documents are inserted into MongoDB
```

## Project Structure

```text
travlr/
├── app.js
├── app_server/
│   ├── controllers/
│   │   ├── main.js
│   │   └── travel.js
│   ├── models/
│   │   ├── db.js
│   │   ├── seed.js
│   │   └── travlr.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── travel.js
│   │   └── users.js
│   └── views/
│       ├── error.hbs
│       ├── index.hbs
│       ├── travel.hbs
│       ├── layouts/
│       │   └── layout.hbs
│       └── partials/
│           ├── footer.hbs
│           └── header.hbs
├── bin/
│   └── www
├── data/
│   └── trips.json
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   └── static HTML pages
├── package.json
└── package-lock.json
```

## Trip Schema

Each trip document contains the following required fields:

| Field | Mongoose type | Purpose |
|---|---|---|
| `code` | String | Unique trip code |
| `name` | String | Trip name |
| `length` | String | Length of the trip |
| `start` | Date | Trip start date |
| `resort` | String | Resort name and rating |
| `perPerson` | String | Price per traveler |
| `image` | String | Trip image filename |
| `description` | String | Trip description markup |

The `code` and `name` fields are indexed.

## Database Access Module

The database connection is initialized when `app.js` loads the database module:

```javascript
require('./app_server/models/db');
```

The connection defaults to the local MongoDB host:

```text
mongodb://127.0.0.1/travlr
```

A different host can be supplied through the `DB_HOST` environment variable.

The module also monitors connection events and closes the Mongoose connection during application termination.

## Seed Data

The seed data remains in:

```text
data/trips.json
```

The collection contains:

- Gale Reef
- Dawson's Reef
- Claire's Reef

Each record includes the complete set of fields required by the Mongoose schema.

## Populate the Database

Make sure MongoDB is running, then execute the seed script from the project root:

```powershell
node .\app_server\models\seed.js
```

A successful run displays:

```text
Seeded 3 trips.
```

The seed script:

1. Connects to the `travlr` database
2. Deletes existing documents from the `trips` collection
3. Inserts the three records from `data/trips.json`
4. Closes the database connection

## Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/PF-Hulk/CS-465.git
cd CS-465
```

### 2. Check out the Module 4 branch

```bash
git checkout module4
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start MongoDB

Confirm that the local MongoDB service is running.

### 5. Populate the database

```powershell
node .\app_server\models\seed.js
```

### 6. Start the Express server

```powershell
$env:DEBUG="travlr:*"; npm start
```

### 7. Open the application

```text
http://localhost:3000
```

Open the travel page:

```text
http://localhost:3000/travel
```

## Verification

The Module 4 version is complete when:

- `npm install` completes successfully
- MongoDB is running locally
- The application connects to the `travlr` database
- The seed script reports that three trips were inserted
- The `travlr` database contains a `trips` collection
- The collection contains three correctly formatted trip documents
- Every document contains all eight required schema fields
- `npm start` launches the Express application
- The existing MVC travel page continues to render correctly

## Branch Status

This branch represents the MongoDB and Mongoose database foundation completed before RESTful API routes are introduced in Module 5.
