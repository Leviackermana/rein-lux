# REINLUX Kundenservice

Independent QR issue reporting application. This folder is intentionally a standalone Next.js project, not part of the existing website build.

## Setup

1. Copy this directory into a new GitHub repository (suggested: reinlux-kundenservice).
2. Run npm install and npm run dev.
3. Open http://localhost:3000/?objekt=TEST-001.

This is a **UI prototype**. No reports are sent or stored yet. Before production: add authenticated admin, database, private photo uploads, rate limiting, consent/privacy information, and email notifications. Never put service keys in the browser.

Deploy the separate repository and map service.reinlux.at to it. Do not attach this domain to the existing website project.
