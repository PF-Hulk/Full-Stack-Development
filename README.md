# Travlr Getaways — Module 1

This branch contains the Module 1 version of the Travlr Getaways website for **CS 465: Full Stack Development I**.

Module 1 established the initial development environment and converted the provided Travlr website assets into a static website served by an Express application.

## Module Goals

- Set up the Node.js and Express development environment
- Review basic HTML structure and static web content
- Organize the Travlr website inside an Express project
- Serve HTML, CSS, and image assets through Express
- Verify the application in a web browser
- Preserve the completed work in the `module1` GitHub branch

## Technologies Used

- Node.js
- Express
- JavaScript
- HTML
- CSS
- Handlebars package included by the Express generator
- Git and GitHub

## Completed Work

- Generated the Express application structure
- Installed project dependencies with npm
- Added the Travlr static HTML pages to the `public` directory
- Added the provided stylesheet and image assets
- Confirmed that Express serves the website at `http://localhost:3000`
- Created the `module1` branch as the first project checkpoint

## Project Structure

```text
travlr/
├── app.js
├── bin/
│   └── www
├── public/
│   ├── about.html
│   ├── contact.html
│   ├── index.html
│   ├── meals.html
│   ├── news.html
│   ├── rooms.html
│   ├── travel.html
│   ├── css/
│   │   └── style.css
│   └── images/
├── routes/
├── views/
├── package.json
└── package-lock.json
```

The website is served primarily from the `public` directory. Express static middleware provides the HTML pages, stylesheet, and image assets to the browser.

## Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/PF-Hulk/CS-465.git
cd CS-465
```

### 2. Check out the Module 1 branch

```bash
git checkout module1
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Express server

```bash
npm start
```

### 5. Open the website

Navigate to:

```text
http://localhost:3000
```

## Available Static Pages

- `/`
- `/travel.html`
- `/rooms.html`
- `/meals.html`
- `/news.html`
- `/about.html`
- `/contact.html`

## Verification

The Module 1 version is complete when:

- `npm install` completes successfully
- `npm start` launches the Express server
- `http://localhost:3000` displays the styled Travlr Getaways homepage
- Navigation pages, CSS, and images load correctly

## Branch Status

This branch represents the original static Express implementation completed before the MVC refactor introduced in Module 2.
