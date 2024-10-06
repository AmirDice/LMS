import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { title, categoryId } = await req.json()

    const Course = await db.course.create({
      data: {
        userId,
        title,
        categoryId
        
      }
    })

    return NextResponse.json(Course, {status: 200 })
  } catch (err) {
    console.log("[courses_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}