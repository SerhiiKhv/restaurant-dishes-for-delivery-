import {Category} from "@/app/models/Category";

export async function POST(req: any) {
    const {name} = await req.json()
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc)
}

export async function GET() {
    return Response.json(
        await Category.find()
    )
}