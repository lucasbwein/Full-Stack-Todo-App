# Full-Stack Todo Application

A complete task management application with persistent storage, built to learn full-stack development fundamentals.

Live here: https://full-stack-todo-app-3v3p.onrender.com

## Overview

### Features
- Create, read, update, and delete todos (CRUD operations)
- Mark tasks as complete/incomplete with visual feedback
- Priority system (Low, Medium, High) with color-coding
- Persistent storage with MongoDB database
- Reorder tasks with up/down arrows

### UI/UX
- Light/dark theme toggle with localStorage persistence
- Smooth animations using Framer Motion
- Responsive design for mobile and desktop
- Green pulse effect on task completion
- Auto-saves theme preference

## Tech Stack

**Frontend:**
- React (Hooks: useState, useEffect)
- Framer Motion (animations)
- CSS (custom styling with theme support)

**Backend:**
- Node.js
- Express.js
- MongoDB (database)

**Deployment:**
- Frontend & Backend: Render

## What I Learned

This project was built following a tutorial to understand full-stack architecture fundamentals:
- RESTful API design (GET, POST, PUT, DELETE endpoints)
- React state management across multiple components
- MongoDB integration and CRUD operations
- Component-based architecture
- Async/await patterns for API calls
- Theme persistence with localStorage

These concepts were then applied to build original applications from scratch ([Replace the Urge](https://urge-replacer.vercel.app) and [Questions Worth Asking](https://authentic-conversation-starter.vercel.app)).

## Local Development

### Prerequisites
- Node.js installed
- MongoDB instance running

### Setup

1. Clone the repository
```bash
git clone https://github.com/lucasbwein/full-stack-todo-app.git
cd full-stack-todo-app
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with MongoDB connection string
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   ├── Todo.jsx         # Individual todo component
│   │   ├── style.css        # Styling
│   │   └── index.jsx        # Entry point
├── server/
│   ├── routes/              # API endpoints
│   └── index.js             # Server setup
└── README.md
```

## API Endpoints

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo status
- `DELETE /api/todos/:id` - Delete todo

## Future Improvements

- User authentication
- Due dates and reminders
- Categories/tags for organization
- Search and filter functionality
- Drag-and-drop reordering

## License

MIT License - see LICENSE file for details

## Connect

- Portfolio: [lucasweinsteinportfolio.vercel.app]
- GitHub: [@lucasbwein](https://github.com/lucasbwein)
- LinkedIn: [Lucas Weinstein](https://linkedin.com/in/lucasweinstein)