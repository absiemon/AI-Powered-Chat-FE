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
