Perfect 👍 You don’t want **Live Demo**, **Postman docs**, but you **do want proper folder structure** included in the README.
Here’s a refined **README.md** tailored for your Library Management System:

---

````markdown
# 📚 Library Management System API

A RESTful API for managing a library, built with **Express.js**, **TypeScript**, and **MongoDB**.  
It supports managing books, borrowing records, and generating summaries of borrowed books.

---

## 🚀 Features

- 📖 CRUD operations for books
- 🔍 Filtering, sorting, and pagination
- 📦 Borrow books with stock validation
- 📊 Borrowed books summary using aggregation
- ⚡ Centralized error handling & standardized responses
- ✅ TypeScript for type safety

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Runtime:** ts-node-dev

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/SumsulArifin/library-management-system
cd library-management-api
````

Install dependencies:

```bash
npm install
```

Set up environment variables in a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library?retryWrites=true&w=majority
```

Run the server in development mode:

```bash
npm run dev
```

The API will run at:

```
http://localhost:3000/
```

## 📖 API Endpoints

### 1. Create Book

**POST** `/api/books`

Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

---

### 2. Get All Books

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```

---

### 3. Get Book by ID

**GET** `/api/books/:bookId`

Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ... }
}
```

---

### 4. Update Book

**PUT** `/api/books/:bookId`

Request:

```json
{
  "copies": 50
}
```

Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### 5. Delete Book

**DELETE** `/api/books/:bookId`

Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 6. Borrow a Book

**POST** `/api/borrow`

Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

---

### 7. Borrowed Books Summary

**GET** `/api/borrow`

Response:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ✅ Standard Response Format

### Success

```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Copies must be a positive number"
}
```

---

## 👨‍💻 Author

Developed by **\Md.Sumsul Arifin**

---
