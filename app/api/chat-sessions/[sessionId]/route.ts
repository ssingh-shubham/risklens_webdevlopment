import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

// GET /api/chat-sessions/[sessionId] - Get session with messages
export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = parseInt(params.sessionId);

    if (isNaN(sessionId)) {
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    // Fetch session with messages
    const session = await prisma.chatSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            type: true,
            content: true,
            sources: true,
            createdAt: true,
            userId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Format response
    const formattedSession = {
      id: session.id,
      title: session.title,
      userId: session.userId,
      userName: session.user.name,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      messages: session.messages.map((message) => ({
        id: message.id,
        type: message.type,
        content: message.content,
        sources: message.sources || [],
        createdAt: message.createdAt.toISOString(),
        userId: message.userId,
      })),
    };

    return NextResponse.json(formattedSession);

  } catch (error) {
    console.error("Error fetching chat session:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error.code, error.message);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/chat-sessions/[sessionId] - Update session (rename)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = parseInt(params.sessionId);

    if (isNaN(sessionId)) {
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, userId } = body;

    if (!title?.toString().trim()) {
      return NextResponse.json(
        { error: "Title is required and cannot be empty" },
        { status: 400 }
      );
    }

    const newTitle = title.toString().trim();
    if (newTitle.length > 255) {
      return NextResponse.json(
        { error: "Title cannot exceed 255 characters" },
        { status: 400 }
      );
    }

    // Optional: Verify user ownership if userId is provided
    let whereClause: any = { id: sessionId };
    if (userId) {
      const userIdNum = parseInt(userId.toString());
      if (!isNaN(userIdNum)) {
        whereClause.userId = userIdNum;
      }
    }

    const updatedSession = await prisma.chatSession.update({
      where: whereClause,
      data: {
        title: newTitle,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        userId: true,
      },
    });

    return NextResponse.json({
      success: true,
      session: {
        id: updatedSession.id,
        title: updatedSession.title,
        updatedAt: updatedSession.updatedAt.toISOString(),
        userId: updatedSession.userId,
      },
    });

  } catch (error) {
    console.error("Error updating chat session:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Session not found or access denied" },
          { status: 404 }
        );
      }
      console.error("Prisma error:", error.code, error.message);
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

// DELETE /api/chat-sessions/[sessionId] - Delete session
export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = parseInt(params.sessionId);

    if (isNaN(sessionId)) {
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    // Optional: Add user authorization
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    let whereClause: any = { id: sessionId };
    if (userId) {
      const userIdNum = parseInt(userId);
      if (!isNaN(userIdNum)) {
        whereClause.userId = userIdNum;
      }
    }

    // Delete session (cascade will delete associated messages)
    await prisma.chatSession.delete({
      where: whereClause,
    });

    return NextResponse.json({ 
      success: true,
      message: "Session deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting chat session:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Session not found or access denied" },
          { status: 404 }
        );
      }
      console.error("Prisma error:", error.code, error.message);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}