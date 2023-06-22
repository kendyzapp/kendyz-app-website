import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    let prestations = await prisma.prestation.findMany()
    return NextResponse.json(prestations)
}

export async function POST(request: Request) {
    let prestations = await prisma.prestation.findMany()
    return NextResponse.json(prestations)
}