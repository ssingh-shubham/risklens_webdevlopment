import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

// POST /api/chat-messages - Save new message to session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, content, sources } = body;

    // Validate required fields
    if (!sessionId || !type || !content) {
      console.log("Missing required fields:", { sessionId: !!sessionId, type: !!type, content: !!content });
      return NextResponse.json(
        { error: "Missing required fields: sessionId, type, and content are required" },
        { status: 400 }
      );
    }

    // Validate message type
    if (!["user", "assistant"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid message type. Must be 'user' or 'assistant'" },
        { status: 400 }
      );
    }

    // Validate content length for LONGTEXT (16MB limit)
    if (typeof content !== "string" || content.length > 16777215) {
      return NextResponse.json(
        { error: "Message content must be a string and cannot exceed 16MB" },
        { status: 400 }
      );
    }

    // Convert sessionId to number
    const sessionIdNum = parseInt(sessionId.toString());
    if (isNaN(sessionIdNum)) {
      return NextResponse.json(
        { error: "Invalid sessionId format" },
        { status: 400 }
      );
    }

    // Check if session exists and get session details
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionIdNum },
      select: { id: true, userId: true }
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Determine userId based on message type
    // User messages: associate with session owner
    // Assistant messages: no user association (null)
    const messageUserId = type === "user" ? session.userId : null;

    // Handle sources properly - ensure it's valid JSON or null
    let processedSources = null;
    if (sources) {
      try {
        // If sources is already an object, stringify and parse to ensure it's valid JSON
        if (typeof sources === 'object') {
          processedSources = sources;
        } else if (typeof sources === 'string') {
          processedSources = JSON.parse(sources);
        }
      } catch (error) {
        console.warn('Invalid sources JSON, setting to null:', error);
        processedSources = null;
      }
    }

    // Create new chat message
    const newMessage = await prisma.chatMessage.create({
      data: {
        sessionId: sessionIdNum,
        userId: messageUserId,
        type: type as "user" | "assistant",
        content: content.toString(),
        sources: processedSources,
      },
    });

    // The session's updatedAt will be automatically updated due to @updatedAt
    // But we can explicitly update it to ensure it's current
    await prisma.chatSession.update({
      where: { id: sessionIdNum },
      data: { updatedAt: new Date() },
    });

    // Format and return response
    return NextResponse.json(
      {
        id: newMessage.id,
        sessionId: newMessage.sessionId,
        userId: newMessage.userId,
        type: newMessage.type,
        content: newMessage.content,
        sources: newMessage.sources || [],
        createdAt: newMessage.createdAt.toISOString(),
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error saving chat message:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2000":
          return NextResponse.json(
            { error: "Message content is too long for database storage" },
            { status: 400 }
          );
        case "P2003":
          return NextResponse.json(
            { error: "Foreign key constraint failed - invalid sessionId or userId" },
            { status: 400 }
          );
        case "P2025":
          return NextResponse.json(
            { error: "Session not found" },
            { status: 404 }
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