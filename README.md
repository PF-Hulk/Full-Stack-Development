# Travlr Getaways — Module 2

This branch contains the Module 2 version of the Travlr Getaways website for **CS 465: Full Stack Development I**.

Module 2 refactored part of the original static Express application into a **Model-View-Controller (MVC)** structure. The travel page now uses an Express route, a controller, a Handlebars view, and reusable header and footer partials.

## Module Goals

- Organize the server-side application using MVC principles
- Separate route handling from controller logic
- Convert the travel page from static HTML to a Handlebars template
- Create reusable Handlebars partials
- Register and test the `/travel` route
- Preserve the completed work in the `module2` GitHub branch

## Technologies Used

- Node.js
- Express
- JavaScript
- Handlebars
- HTML
- CSS
- Git and GitHub

## Completed Work

- Created the `app_server` MVC directory structure
- Added controllers for the home and travel pages
- Added Express route modules
- Connected the `/travel` route to the travel controller
- Converted `travel.html` into `travel.hbs`
- Extracted the header and footer into reusable partials
- Registered the Handlebars partials directory in `app.js`
- Configured Express to use `app_server/views`
- Retained the original static files and assets in `public`
- Verified that the travel page renders at `http://localhost:3000/travel`

## MVC Request Flow

```text
Browser request
      ↓
app.js
      ↓
app_server/routes/travel.js
      ↓
app_server/controllers/travel.js
      ↓
app_server/views/travel.hbs
      ↓
Rendered HTML response
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
├── public/
│   ├── css/
│   ├── images/
│   └── static HTML pages
├── package.json
└── package-lock.json
```

## Route and Controller

The travel route is mounted in `app.js`:

```javascript
app.use('/travel', travelRouter);
```

The route delegates the request to the travel controller:

```javascript
router.get('/', ctrlTravel.travel);
```

The controller renders the Handlebars view:

```javascript
const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways' });
};
```

## Handlebars Partials

The travel view uses reusable partials:

```handlebars
{{> header }}
{{> footer }}
```

The partials directory is registered in `app.js`:

```javascript
hbs.registerPartials(
  path.join(__dirname, 'app_server', 'views', 'partials')
);
```

## Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/PF-Hulk/CS-465.git
cd CS-465
```

### 2. Check out the Module 2 branch

```bash
git checkout module2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Express server

```bash
npm start
```

### 5. Open the MVC travel page

Navigate to:

```text
http://localhost:3000/travel
```

## Verification

The Module 2 version is complete when:

- `npm install` completes successfully
- `npm start` launches the Express server
- `GET /travel` returns the travel page
- The travel controller renders `travel.hbs`
- The header and footer partials appear correctly
- CSS and image assets load from the `public` directory

## Branch Status

This branch represents the MVC routing and Handlebars refactor completed before dynamic JSON data is introduced in Module 3.
