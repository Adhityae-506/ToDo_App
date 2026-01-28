# ToDo Application

## Tech Stack

### Backend
- Node.js
- Express.js
- Passport.js
- bcrypt

### Database
- PostgreSQL
- Supabase
- Drizzle ORM

---

## Project Structure

```
ToDo App/
├── src/
│   ├── auth/
│   │   └── passport.js
│   ├── db/
│   │   └── db.js
│   ├── schema/
│   │   └── users.js
|   |   └── tasks.js
│   └── index.js
├── drizzle/
├── drizzle.config.js
├── package.json
└── README.md
```

---

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database(via Supabase)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ToDo App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

#### Create a `.env` file in the root folder

```bash
DATABASE_URL=postgresql://postgres:<PASSWORD>@<HOST>:5432/postgres
```
- Use the Supabase connection string
- Make sure the password and host are correct


### 4. Setup Database Schema(Drizzle)

#### Generate migrations:
```bash
npx drizzle-kit generate
```
#### Push schema to Supabase:
```bash
npx drizzle-kit push
```

### 5. Start the Development Server

```bash
npm run dev
```
#### If successful, you should see
```bash
Server is running at http://localhost:3000
```

---

## Testing with Postman

1. Signup

### POST

```bash
http://localhost:3000/signup
```
#### Body(JSON):

```json
{
  "name": <"YOUR_NAME">,
  "email": <"YOUR_EMAIL_ID">,
  "password": <"YOUR_PASSWORD">
}
```

2. Signin

### POST

```bash
http://localhost:3000/signin
```

#### Body(JSON):
```json
{
  "email": <"YOUR_EMAIL_ID">,
  "password": <"YOUR_PASSWORD">
}
```

---

