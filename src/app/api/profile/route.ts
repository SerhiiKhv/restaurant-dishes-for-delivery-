import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/app/models/User";

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const data = await req.json();
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    await User.updateOne({email}, data)

    return Response.json(true)
}

export async function GET(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const session = await getServerSession(authOptions);
    if (session) {
        const email = session.user?.email;
        if (email) {
            const user = await User.findOne({email});
            return Response.json(user);
        } else {
            return Response.json({error: "Email not found in session"}, {status: 400});
        }
    } else {
        return Response.json({error: "Session not found"}, {status: 400});
    }
}
