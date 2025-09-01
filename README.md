# OSINT Web Tool — Starter (Node.js + Express + static UI)

## Installation

```bash
mkdir /home/$USER/Documents/Scripts/OSINT
cd /home/$USER/Documents/Scripts/OSINT
sudo apt -y install nodejs npm
npm install
nodemon server.js
```

Open your browser at:

```
http://localhost:8910
```

## Ngrok Setup (for public access)

```bash
# Add ngrok repo and key
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com bookworm main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok

# Authenticate with your account token
ngrok authtoken YOUR_NGROK_AUTHTOKEN

# Upgrade config (optional)
ngrok config upgrade

# Expose local server
ngrok http 8910
```

**Alternative authentication:**

```
ngrok authtoken 325nQo3hRfdg94QZljL8pvbXRwU_63J5PiCjDD9KF2hh1uaKN
```

## Included Files (copy into project root)

* `package.json`
* `server.js`
* `public/index.html`
* `public/app.js`
* `public/styles.css`

> ⚠️ Legal & ethics: Only use this tool for lawful, ethical OSINT/research. Do not use it for stalking, harassment, or other malicious acts.

## Overview

Lightweight starter web app for OSINT with features:

* Upload an image (manual reverse-image searches)
* Enter username, phone number, email, or full name
* Launch curated site queries in new tabs or call APIs (with keys)

## How it Works

1. Enter a value or upload an image.
2. App generates buttons for relevant searches.
3. Uploaded images are encoded for manual reverse-image searches.
4. Optional API queries for SocialSearcher or other services.

## Notes on Sites

* `checkusernames.com` — direct username checks.
* `epieos.com` — paid reverse email/phone searches.
* `thatsthem.com` — public people search.
* `social-searcher.com` — requires API key.
* `osintframework.com` — curated OSINT links.

## Server Configuration

* Server listens on port `8900` by default.
* API keys can be added to `config` object in `server.js`.

---

### package.json

```json
{
  "name":"osint-web-tool",
  "version":"0.1.0",
  "main":"server.js",
  "scripts":{
    "start":"node server.js"
  },
  "dependencies":{
    "express":"^4.18.2",
    "multer":"^1.4.5",
    "body-parser":"^1.20.2",
    "axios":"^1.4.0"
  }
}
```

### server.js

*(full file content included as above)*

### public/index.html

*(full file content included as above)*

### public/app.js

*(full file content included as above)*

### public/styles.css

*(full file content included as above)*

## Next Steps

* Integrate SocialSearcher API key and result parsing.
* Integrate Epieos or other paid APIs.
* Add automatic username checks with rate limiting.
* Optional React SPA UI for container deployment.

---

Say `Make files` to generate a downloadable project archive with all files ready.
