import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({message: "Test"}, {status: 200})
}

export async function POST(
  req: NextRequest
) {
    const data = await(req.json())
    return NextResponse.json({data}, {status: 200})
}