import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./auth/passport.js";
import session from "express-session";
import bcrypt from "bcrypt";
import { db } from "./db/db.js";
import { users } from "./schema/users.js";
import taskRoutes from "./routes/task.routes.js";
import { sendEmail } from "./utils/SendEmail.js";
import passwordRoutes from "./routes/password.routes.js";


dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(
    session({
        name: "connect.sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
    saveUninitialized: false,
    
    cookie: {
        httpOnly: true,
        secure: false,        
        sameSite: "lax",      
        maxAge: 1000 * 60 * 60 * 24, 
    },
})
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", passwordRoutes);
app.use("/tasks", taskRoutes);

app.post("/signup", async(req, res) => {
    try{
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db
            .insert(users)
            .values({
                name,
                email,
                password: hashedPassword,
            })
            .returning();
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: result[0].id,
                email: result[0].email,
                name: result[0].name,
            },
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Signup failed"});
    }
});


app.post("/signin", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: "Server error" });
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Invaild credentials",
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: "Login failed" });
            }

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            });
        });
    })(req, res, next);
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});