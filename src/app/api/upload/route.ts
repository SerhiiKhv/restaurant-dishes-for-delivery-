export async function POST(req: any){
    const data = await req.formData()
    if(data.get('file')){
        //upload the file

        
    }

    return Response.json(data)
}