import crypto, { hash } from "crypto";
import { db } from "../db/db.js";
import { users } from "../schema/users.js";
import {eq} from "drizzle-orm";
import { sendEmail } from "../utils/SendEmail.js";
import bcrypt from "bcrypt";

export const forgotPassword = async(req, res) => {
    try{
        const { email } = req.body;

        const result = await db.select().from(users).where(eq(users.email, email));
        const user = result[0];

        if(!user){
            return res.status(404).json({message : "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 15 * 60 * 1000);
        
        await db    
            .update(users)
            .set({
                resetToken,
                resetTokenExpiry:expiry,
            })
            .where(eq(users.id, user.id));

            const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

            await sendEmail(
                email,
                "ToDo App - Reset your password",
                `
                    <h1>ToDo App </h1>
                    <h2>Password Reset</h2>
                    <p>Click the link below to reset your password: </p>
                    <a href="${resetLink}">${resetLink}</a>
                    <p>This link expires in 15 minutes.</p>
                `
            );

            res.json({ message: "Password reset email sent"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error sending reset email"});
    }
};

export const resetPassword = async(req, res) => {
    try{
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        if(newPassword !== confirmPassword){
            return res.status(400).json({message: "Password do not match! Check your password again."})
        }

        const result = await db
            .select()
            .from(users)
            .where(eq(users.resetToken, token));
        
        const user = result[0];

        if(!user || user.resetTokenExpiry < new Date()){
            return res.status(400).json({ message: "Invalid or expired token"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db
            .update(users)
            .set({
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            })
            .where(eq(users.id, user.id));
        res.json({ message: "Password reset successful"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Reset failed"});
    }
};