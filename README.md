# Intro
A simple chat window. You type, hit send, and see the AI reply stream in like a typewriter. Each AI reply also shows two
small badges underneath — the detected intent and sentiment of your message. The conversation resets on page
refresh, which matched the scope I wanted: keep things in-memory, no localStorage, fresh start every time.

# Tech stack
Framework  - React 18 with JavaScript (kept it consistent with the JS backend)
Build tool - Vite (fast dev server, near-instant hot reload)
UI library - Mantine v8 — polished components without writing much CSS
Icons - Tabler Icons
HTTP client - Axios with a small wrapper module
Markdown - How the code is organised react-markdown + remark-gfm (tables, code blocks, etc.)

# Env
```
VITE_API_BASE_URL=
DEV_BACKEND_URL=http://localhost:8000
```

# Setup instruction
Step-1:- Clone the repository
```
git clone https://github.com/absiemon/AI-Powered-Chat-FE.git
```
Step-2:- Get into the root directory(parallel to src) and install the packages.
```
npm install
```
Step-3:- Create a .env file in root directory(parallel to src). Copy the env example given above and paste into it.

<img width="1322" height="382" alt="image" src="https://github.com/user-attachments/assets/a0eea496-cb75-4597-aa34-643c6a232498" />



Step-4:- Start the server 
```
npm run dev
```
