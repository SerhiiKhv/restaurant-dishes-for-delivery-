import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password" },
                name: { label: "UserName", type: "text" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });
                const passwordOk = bcrypt.compareSync(password, user.password);

                if(passwordOk){
                    return user
                }

                return null;
            }
        })
    ],
});

export { handler as GET, handler as POST };
