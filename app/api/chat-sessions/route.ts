import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

// GET /api/chat-sessions - Get all sessions for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required as a query parameter" },
        { status: 400 }
      );
    }

    // Convert userId to number and validate
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Verify user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userIdNum },
      select: { id: true }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch sessions with message count
    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: userIdNum,
      },
      include: {
        _count: {
          select: { messages: true },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Transform the data to match expected format
    const formattedSessions = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      messageCount: session._count.messages,
    }));

    return NextResponse.json(formattedSessions);

  } catch (error) {
    console.error("Error fetching chat sessions:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error.code, error.message);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/chat-sessions - Create new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Convert userId to number and validate
    const userIdNum = parseInt(userId.toString());
    if (isNaN(userIdNum)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Verify user exists before creating session
    const userExists = await prisma.user.findUnique({
      where: { id: userIdNum },
      select: { id: true }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Validate title if provided
    const sessionTitle = title?.toString().trim() || "New Chat";
    if (sessionTitle.length > 255) {
      return NextResponse.json(
        { error: "Title cannot exceed 255 characters" },
        { status: 400 }
      );
    }

    // Only create session when explicitly requested (New Chat button clicked)
    // No automatic session creation
    const newSession = await prisma.chatSession.create({
      data: {
        userId: userIdNum,
        title: sessionTitle,
      },
    });

    // Format response
    const formattedSession = {
      id: newSession.id,
      title: newSession.title,
      createdAt: newSession.createdAt.toISOString(),
      updatedAt: newSession.updatedAt.toISOString(),
      messageCount: 0,
    };

    return NextResponse.json(formattedSession, { status: 201 });

  } catch (error) {
    console.error("Error creating chat session:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2003":
          return NextResponse.json(
            { error: "Invalid user ID - user does not exist" },
            { status: 400 }
          );
        default:
          console.error("Prisma error:", error.code, error.message);
      }
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}