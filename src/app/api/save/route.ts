import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'


export async function GET() {
    return NextResponse.json({message: "Save Active"}, {status: 200})
}

export async function POST(
  req: NextRequest
) {
    let jsonData: JSON = JSON;
    await(req.json())
    .then(data => jsonData = data)
    .catch(error => {
      return NextResponse.json({error}, {status: 500})
    })

    if (jsonData == null){
      return NextResponse.json("Error with passed data", {status: 500})
    }
    fs.writeFileSync("src/app/data/test.json", JSON.stringify(jsonData))
    return NextResponse.json({jsonData}, {status: 200})
}