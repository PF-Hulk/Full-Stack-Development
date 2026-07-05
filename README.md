# CS 465 Full Stack Development I

## Repository Purpose

This repository contains my CS 465 MEAN stack Travlr Getaways application. The project is built across module branches so each branch represents a stage of full stack web application development.

## Branch Guide

| Branch | Module | Status | Summary |
|---|---|---|---|
| `main` | Course overview | Active | Repository README and progress tracker. |
| `module1` | Module One | Complete | Express application shell with static Travlr HTML, CSS, and images rendered from the `public` folder. |

## Module Progress Log

### Module 1 – Static HTML Express Website

Completed:
- Created an Express application using the Handlebars view engine.
- Added Travlr static HTML pages to the Express `public` folder.
- Added Travlr CSS and image assets to the appropriate static folders.
- Verified the site renders at `http://localhost:3000`.
- Pushed Module One work to the `module1` branch.

## Current Setup Notes

Run the project locally from the `travlr` folder:

```powershell
npm install
$env:DEBUG="travlr:*"; npm start
