import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Thing name is required" },
        { status: 400 }
      );
    }

    const newThing = await prisma.thing.create({
      data: {
        name,
        createdAt: new Date()
      }
    })

    console.log('newThing')
    console.log(newThing)

    return NextResponse.json(newThing, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create thing" },
      { status: 500 }
    );
  }
}
