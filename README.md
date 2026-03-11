# Kirka.io Userscripts Collection

A set of useful userscripts to enhance your [Kirka.io](https://kirka.io) experience.  
Each script adds specific functionality – from custom skins and UI improvements to keyboard overlay and trade automation.

## 📜 Table of Contents

- [Installation](#installation)
- [Scripts Overview](#scripts-overview)
  - [1. Accept Trade Easily](#1-accept-trade-easily)
  - [2. Chams (Custom Skin Link)](#2-chams-custom-skin-link)
  - [3. Friends UI Features](#3-friends-ui-features)
  - [4. Global Chat CSS](#4-global-chat-css)
  - [5. Keystroke Overlay](#5-keystroke-overlay)
- [Disclaimer](#disclaimer)

---

## Installation

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge) or [Greasemonkey](https://www.greasespot.net/) (Firefox).
2. Click on the raw link of any script below (or copy its content).
3. Your userscript manager should open a new tab; click **Install**.
4. The script will automatically run on Kirka.io pages.

> **Note:** Some scripts modify the DOM and rely on specific Kirka.io page structures. If the game updates, they may temporarily break – feel free to open an issue.

---

## Scripts Overview

### 1. Accept Trade Easily

**File:** `accept trade easly.js`

Automates the two-step trade acceptance process.  
When a trade message appears in chat containing `/trade accept <code>`, the script highlights the clickable part. Clicking it fills the chat input with `/trade accept <code>a`. After sending, it automatically fills the confirmation with `/trade confirm <code>q`.

**Features:**
- Clickable trade messages (purple background).
- Auto‑fills the second confirmation step.
- Works for any trade code.

**Usage:**  
Simply click on any highlighted trade message in chat, then press Enter to send. The script will handle the rest.

---

### 2. Chams (Custom Skin Link)

**File:** `chams.js`

Extends the built‑in custom skin feature (originally by infi and boden) with a color picker and URL support.  
Allows you to change the head and body colors of your player model via a live canvas preview, or load a custom skin image from a URL.

**Features:**
- **Head / Body color pickers** – live update on a preview canvas.
- **URL input** – paste a direct image link (supports CORS‑enabled images) and convert it to base64.
- **Toggle** to switch between color‑picked skin and URL‑based skin.
- Settings are saved in `localStorage`.

**Usage:**  
Open the **Scripts Options** panel in Kirka.io (usually under settings). You’ll find:
- A checkbox to enable/disable the custom skin.
- Color pickers for head and body.
- A text field for a custom image URL.
- A toggle to choose which source to use.
- The generated data URL is automatically applied to your player model.

> **Note:** The original BKC custom skin feature must be present for this script to hook into.

---

### 3. Friends UI Features

**File:** `friends_ui_features.js`

Adds handy tools to the friends page (`/friends`).

**Features:**
- **Search Bar** – filter your friends list by nickname or friend ID (case‑insensitive).
- **Deny All Requests** – a button that cycles through all pending friend requests and denies them one by one (with a confirmation step).
- **Number Formatting** – automatically adds commas to large numbers (EXP, stats, etc.) for better readability.

**Usage:**  
Navigate to the friends page. The search bar appears above your friends list; type to filter.  
Below it you’ll see a red **“DENY ALL REQUESTS”** button. Click once to confirm, then again to start denying. A yellow **“BACK”** button lets you cancel.

---

### 4. Global Chat CSS

**File:** `global-chat-css.js`

Fetches and injects a custom stylesheet for the global chat from a GitHub repository.  
The CSS enhances the chat appearance (colors, spacing, etc.) – see [crumpledflowers/kirka-css](https://github.com/crumpledflowers/kirka-css) for the exact styles.

**Features:**
- Automatically loads the latest CSS from the raw GitHub URL.
- Silently applies the style; no configuration needed.

**Usage:**  
Just install the script – it will run on Kirka.io and apply the chat theme.

---

### 5. Keystroke Overlay

**File:** `keystroke-overlay.js`

Displays a movable, draggable overlay that shows your current key presses and mouse clicks.  
Perfect for streamers, tutorial creators, or anyone who wants to visualise their inputs.

**Features:**
- **Two layouts** – full keyboard (all keys) or compact (WASD + essential keys).
- Toggle between layouts by clicking the **🔁** button.
- Visual feedback: keys turn white when pressed.
- Supports mouse buttons: LMB, RMB, MMB.
- Fully draggable – click and drag the overlay (except on keys or the toggle button).

**Usage:**  
After installation, a small overlay appears at the top‑left corner of the page. Drag it anywhere. Use the **🔁** button to switch between full and compact mode.

---

## Disclaimer

These scripts are unofficial and not affiliated with Kirka.io. Use them at your own risk. While they are intended to be harmless, any automation (like the trade helper) could be considered against the game’s terms of service. The author is not responsible for any consequences arising from their use.

For issues or suggestions, please open an issue on the repository where these scripts are hosted.

---

Enjoy your enhanced Kirka.io experience! 🎮
