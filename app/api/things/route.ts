import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const things = await prisma.thing.findMany();
    return NextResponse.json(things, { status: 201});
  } catch(error) {
    console.log('Filed to get things')
    return NextResponse.json(
      { error: "Failed to get things"},
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body
    const deleteThing = await prisma.thing.delete({
      where: {
        id
      }
    })
    return NextResponse.json(deleteThing, { status: 201})
  } catch(error) {
    return NextResponse.json(
      { error: "Failed to delete thing" },
      { status: 500 }
    )
  }
}

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

    return NextResponse.json(newThing, { status: 201 });
  } catch (error) {
    console.log('Filed to create things')
    return NextResponse.json(
      { error: "Failed to create thing" },
      { status: 500 }
    );
  }
}
