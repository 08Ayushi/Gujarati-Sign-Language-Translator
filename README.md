# Gujarati Sign Language Translator

[![Made with Node.js](https://img.shields.io/badge/Node.js-18%2B-informational?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-blue?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?logo=mongodb)](https://www.mongodb.com/atlas)
[![Web Speech API](https://img.shields.io/badge/API-Web%20Speech%20API-orange)](https://developer.mozilla.org/docs/Web/API/Web_Speech_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-success)](#contributing)
[![Status-Research](https://img.shields.io/badge/Status-Research%20Prototype-purple)]()

> A web-based system that converts Gujarati text or speech into Sign Language animations using HamNoSys → SiGML → Avatar playback.

---

## Table of Contents
- [Overview](#overview)
- [End-to-End Workflow](#end-to-end-workflow)
- [Documentation & References](#documentation--references)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Design](#database-design)
- [Our GUI](#our-gui)
- [How It Works (User Flow)](#how-it-works-user-flow)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Gujarati Localization (ગુજરાતી)](#gujarati-localization-ગુજરાતી)

---

## Overview
The **Gujarati Sign Language Translator** enables users to enter Gujarati input (typed or spoken) and view corresponding sign animations. It leverages **HamNoSys** for linguistic notation, converts it to **SiGML**, and plays animations via a signing avatar. A curated MongoDB Atlas database stores verified SiGML scripts for Gujarati alphabets and common words/phrases.

---

## End-to-End Workflow
1. **Input**: User types Gujarati text (custom keyboard) *or* uses microphone (Web Speech API).
2. **HamNoSys Creation**: Notation authored using the official HamNoSys input keyboard (offline prep / admin).
3. **Conversion**: HamNoSys → SiGML via converter.
4. **Verification**: SiGML validated in VHG/CWASA Player GUI.
5. **Storage**: Verified SiGML saved in MongoDB Atlas.
6. **Runtime Mapping**: User input tokens → DB lookup → sequential avatar animation.

---

## Documentation & References
| Purpose | Resource |
|--------|----------|
| HamNoSys Specification (PDF) | [HamNoSys 2006 English PDF](https://www.sign-lang.uni-hamburg.de/dgs-korpus/files/inhalt_pdf/HamNoSys_06en.pdf) |
| HamNoSys Input Tool | [Online HamNoSys Keyboard](https://www.sign-lang.uni-hamburg.de/hamnosys/input/) |
| HamNoSys → SiGML Converter | [HamNoSys2SiGML GitHub Repo](https://github.com/carolNeves/HamNoSys2SiGML) |
| SiGML Playback / Player | [VHG SiGML Player GUI](https://vhg.cmp.uea.ac.uk/tech/SiGML/) |
| Web Speech API Docs | [MDN Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API) |
| MongoDB Atlas | [Atlas Cloud Database](https://www.mongodb.com/atlas) |

---

## Technology Stack
**Frontend**: HTML, CSS, JavaScript, Custom Gujarati Keyboard UI, Web Speech API  
**Backend**: Node.js, Express.js  
**Database**: MongoDB Atlas (cloud-hosted)  
**Avatar / Player Assets**: CWASA / VHG SiGML Player resources (cwa folder)  

---

## Project Structure
.
├── .vscode/
├── cwa/
│ ├── grips/
│ ├── allcsa.js
│ ├── cwaclientcfg.json
│ ├── cwapp.css
│ ├── cwasa.css
│ └── split-grid.js
├── images/ # GUI / keyboard / avatar screenshots
├── node_modules/
├── scripts/
│ └── inpage.js
├── .env # environment variables (e.g., MONGODB_URI)
├── admin.html
├── allcsa.js
├── cwaclientcfg.json
├── cwapp.css
├── cwasa.css
├── forget.css
├── forget.html
├── fscript.js
├── home.css# Gujarati Sign Language Translator

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-informational?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-blue?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?logo=mongodb)](https://www.mongodb.com/atlas)
[![Web Speech API](https://img.shields.io/badge/API-Web%20Speech%20API-orange)](https://developer.mozilla.org/docs/Web/API/Web_Speech_API)
[![License: SRL-1.0](https://img.shields.io/badge/License-SRL--1.0-yellow)](#license)
[![Contributions](https://img.shields.io/badge/Contributions-By%20Approval-success)](#contributing)
[![Status](https://img.shields.io/badge/Status-Research%20Prototype-purple)]()

> A web-based system that converts Gujarati text or speech into Sign Language animations using HamNoSys → SiGML → avatar playback.

---

## Table of Contents
- [Overview](#overview)
- [End-to-End Workflow](#end-to-end-workflow)
- [Documentation & References](#documentation--references)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Design](#database-design)
- [Our GUI](#our-gui)
- [How It Works (User Flow)](#how-it-works-user-flow)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Gujarati Localization (ગુજરાતી)](#gujarati-localization-ગુજરાતી)

---

## Overview
The **Gujarati Sign Language Translator** enables users to enter Gujarati input (typed or spoken) and view corresponding sign animations. It leverages **HamNoSys** for linguistic notation, converts it to **SiGML**, and plays animations via a signing avatar. A curated MongoDB Atlas database stores verified SiGML scripts for Gujarati alphabets and common words/phrases.

---

## End-to-End Workflow
1. **Input** – User types (custom Gujarati keyboard) or uses mic (Web Speech API).  
2. **HamNoSys Creation** – Notation authored offline/admin.  
3. **Conversion** – HamNoSys → SiGML (converter).  
4. **Verification** – SiGML validated in VHG/CWASA player.  
5. **Storage** – Verified SiGML saved in MongoDB Atlas.  
6. **Runtime Mapping** – Input tokens → SiGML → sequential avatar animation.

---

## Documentation & References
| Purpose | Resource |
|--------|----------|
| HamNoSys Specification (PDF) | [HamNoSys 2006 English PDF](https://www.sign-lang.uni-hamburg.de/dgs-korpus/files/inhalt_pdf/HamNoSys_06en.pdf) |
| HamNoSys Input Tool | [Online HamNoSys Keyboard](https://www.sign-lang.uni-hamburg.de/hamnosys/input/) |
| HamNoSys → SiGML Converter | [HamNoSys2SiGML (GitHub)](https://github.com/carolNeves/HamNoSys2SiGML) |
| SiGML Playback / Player | [VHG SiGML Player GUI](https://vhg.cmp.uea.ac.uk/tech/SiGML/) |
| Web Speech API | [MDN Docs](https://developer.mozilla.org/docs/Web/API/Web_Speech_API) |
| MongoDB Atlas | [Atlas Cloud](https://www.mongodb.com/atlas) |

---

## Technology Stack
**Frontend:** HTML, CSS, JavaScript, Custom Gujarati Keyboard UI, Web Speech API  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas (cloud-hosted)  
**Avatar / Player Assets:** CWASA / VHG SiGML Player resources (cwa folder)

---

## Project Structure
.
├── .vscode/
├── cwa/
│   ├── grips/
│   ├── allcsa.js
│   ├── cwaclientcfg.json
│   ├── cwapp.css
│   ├── cwasa.css
│   └── split-grid.js
├── images/                 # GUI / keyboard / avatar screenshots
├── node_modules/
├── scripts/
│   └── inpage.js
├── .env                     # environment variables (e.g., MONGODB_URI)
├── admin.html
├── allcsa.js
├── cwaclientcfg.json
├── cwapp.css
├── cwasa.css
├── forget.css
├── forget.html
├── fscript.js
├── home.css
├── home.html
├── home.js
├── index.html
├── login.html
├── mobile_signmitra.html
├── package.json
├── package-lock.json
├── script.js
├── server.js
├── SiGML-Player-gui1.html
├── split-grid.js
└── style.css

├── home.html
├── home.js
├── index.html
├── login.html
├── mobile_signmitra.html
├── package.json
├── package-lock.json
├── script.js
├── server.js
├── SiGML-Player-gui1.html
├── split-grid.js
└── style.css


---

## Setup & Installation

### 
1. Clone

git clone https://github.com/<YOUR_ORG>/<YOUR_REPO>.git
cd <YOUR_REPO>

2. Install Dependencies

npm install

3. Configure Environment
Create .env:

MONGODB_URI=your-mongodb-atlas-connection-string

Environment Variables
Variable	Required	Description
MONGODB_URI	Yes	Full MongoDB Atlas connection URI (with credentials & db name).

Running the Application
Development run:

node server.js
# or with auto-reload (if nodemon installed):
npx nodemon server.js

Open index.html in your browser (or serve via a static server if needed).



Database Design
Collections (conceptual):

alphabets – Each Gujarati character → stored SiGML segment.

words – Common high-frequency words/phrases mapped to optimized multi-sign sequences.

Access Policy: Dataset is private (research). Contact authors for academic collaboration.

Lookup fallback:

Full word

If not found → decompose into characters

Stream concatenated SiGML to avatar


Our GUI:
<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/16cda06f-b2b6-47c9-8bb7-1a2dba28f248" />
We made our own gujarati keyboard as shown so users can type using it. For speech input the user clicks the mic button on the right side that opens the mic for speaking. On clicking the run button the avatar plays the animation by mapping the input to the SiGML stored in Database.

Contributing
We welcome contributions!


# Fork on GitHub
git checkout -b feature/my-feature
# Make changes
git commit -m "feat: add <description>"
git push origin feature/my-feature
# Open a Pull Request
Guidelines:

Use meaningful commit messages (Conventional Commits preferred).

Document any DB schema or asset pipeline changes.

Open an issue before large refactors.

Contact
For questions, research collaboration, or dataset access:

soniayushi880@gmail.com

devdshah2311@gmail.com

maitriba1845@gmail.com

vishwapjoshi@gmail.com


License
Released under the MIT License.

## License

This project is released under a custom **SIGNMitra Restricted License (SRL-1.0)**.  
You **must request and obtain explicit approval** (Pull Request or written consent) before any use, modification, or distribution.

See the full [LICENSE](./LICENSE) file for details.

> Third-party components retain their original licenses; curated SiGML / HamNoSys datasets remain proprietary.

