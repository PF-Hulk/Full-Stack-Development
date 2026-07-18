# Travlr Getaways — Module 3

This branch contains the Module 3 version of the Travlr Getaways website for **CS 465: Full Stack Development I**.

Module 3 builds on the Model-View-Controller structure created in Module 2. The travel page no longer contains a separate hard-coded HTML block for every trip. Instead, the application reads trip information from a JSON file, passes the resulting data through the travel controller, and uses a Handlebars loop to generate the page.

## Module Goals

- Replace hard-coded trip markup with reusable Handlebars templating
- Store prototype trip data in a JSON file
- Read and parse the JSON data in the travel controller
- Pass the trip collection from the controller to the view
- Render each trip dynamically with a Handlebars `each` loop
- Preserve the completed work in the `module3` GitHub branch

## Technologies Used

- Node.js
- Express
- JavaScript
- Handlebars
- JSON
- HTML
- CSS
- Git and GitHub

## Completed Work

- Created the `data` directory
- Added `data/trips.json`
- Stored the trip name, image filename, and description for each trip in JSON
- Updated `app_server/controllers/travel.js` to read and parse the JSON file
- Passed the `trips` collection to the Handlebars view
- Replaced the repeated static trip markup in `travel.hbs` with `{{#each trips}}`
- Used Handlebars expressions to display each trip's name, image, and description
- Retained the MVC routes and reusable header and footer partials from Module 2
- Prepared the application for the database work introduced in Module 4

## Dynamic Rendering Flow

```text
Browser requests /travel
          ↓
Express travel route
          ↓
Travel controller
          ↓
Controller reads data/trips.json
          ↓
JSON text is parsed into JavaScript objects
          ↓
The trips collection is passed to travel.hbs
          ↓
Handlebars loops through the collection
          ↓
The completed travel page is returned to the browser
```

## Project Structure

```text
travlr/
├── app.js
├── app_server/
│   ├── controllers/
│   │   ├── main.js
│   │   └── travel.js
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

## JSON Trip Data

The prototype trip data is stored in `data/trips.json`.

Each object contains:

```json
{
  "name": "Gale Reef",
  "image": "reef1.jpg",
  "description": "<p>Trip description content...</p>"
}
```

The current data collection includes:

- Gale Reef
- Dawson's Reef
- Claire's Reef

## Travel Controller

The travel controller uses Node's built-in file system module to read the JSON file:

```javascript
const fs = require('fs');

const trips = JSON.parse(
  fs.readFileSync('./data/trips.json', 'utf8')
);
```

The parsed collection is passed to the view:

```javascript
const travel = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    trips
  });
};
```

This synchronous file-reading approach is appropriate for the course prototype. A production application should retrieve the data through a database or another persistent data service rather than reading the JSON file during application startup.

## Handlebars Template

The travel view loops through the collection:

```handlebars
{{#each trips}}
  <li>
    <a href="/travel">
      <img src="images/{{this.image}}" alt="Img">
    </a>

    <h2>
      <a href="/travel">{{this.name}}</a>
    </h2>

    {{{this.description}}}
  </li>
{{/each}}
```

The double braces escape normal text values. Triple braces are used for the description because the JSON descriptions contain paragraph markup that must be rendered as HTML.

## Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/PF-Hulk/CS-465.git
cd CS-465
```

### 2. Check out the Module 3 branch

```bash
git checkout module3
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Express server

```bash
npm start
```

### 5. Open the dynamic travel page

Navigate to:

```text
http://localhost:3000/travel
```

## Verification

The Module 3 version is complete when:

- `data/trips.json` contains valid JSON
- `npm start` launches the Express server
- `GET /travel` renders successfully
- All three trip names appear on the page
- The correct trip images and descriptions are displayed
- The page is generated from the Handlebars loop rather than repeated static trip markup
- Header and footer partials continue to render correctly
- CSS and image assets load from the `public` directory

## Branch Status

This branch represents the JSON-backed Handlebars implementation completed before MongoDB, Mongoose models, and database seeding are introduced in Module 4.
