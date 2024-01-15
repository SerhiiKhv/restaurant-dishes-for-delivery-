import {MenuItem} from "@/app/models/MenuItems";
import mongoose from "mongoose";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {name, description, price, image} = await req.json()
    const menuItemDoc = await MenuItem.create({name, description, price, image})
    return Response.json(menuItemDoc)
}

export async function GET() {
    await mongoose.connect(String(process.env.MONGO_URL));
    return Response.json(
        await MenuItem.find()
    )
}