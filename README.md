# CS 465 Full Stack Development I

## Repository Purpose

This repository contains my CS 465 MEAN stack Travlr Getaways application. The project is built across module branches so each branch represents a stage of full stack web application development.

## Branch Guide

| Branch | Module | Status | Summary |
|---|---|---|---|
| `main` | Course overview | Active | Repository README and progress tracker. |
| `module1` | Module One | Complete | Express application shell with static Travlr HTML, CSS, and images rendered from the `public` folder. |
| `module2` | Module Two | Complete | Refactored the Express application into an MVC structure with server side routing, controllers, Handlebars views, and reusable partials. |

## Module Progress Log

### Module 1 – Static HTML Express Website

Completed:
- Created an Express application using the Handlebars view engine.
- Added Travlr static HTML pages to the Express `public` folder.
- Added Travlr CSS and image assets to the appropriate static folders.
- Verified the site renders at `http://localhost:3000`.
- Pushed Module One work to the `module1` branch.

### Module 2 – MVC Routing and Handlebars Templates

Completed:
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

## Current Setup Notes

Run the project locally from the `travlr` folder:

```powershell
npm install
$env:DEBUG="travlr:*"; npm start
