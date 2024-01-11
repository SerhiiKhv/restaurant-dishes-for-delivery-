import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
    secret: process.env.SECRET,
    //adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password" },
                name: { label: "UserName", type: "text" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                await mongoose.connect(String(process.env.MONGO_URL));
                const user = await User.findOne({ email });
                const passwordOk = bcrypt.compareSync(String(password), user.password);

                if (passwordOk) {
                    return user;
                }

                return null;
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
