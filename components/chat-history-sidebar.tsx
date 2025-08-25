"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, ChevronLeft, ChevronRight, Edit2, MessageSquare, Plus, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"

interface ChatSession {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

interface ChatHistorySidebarProps {
  currentSessionId?: number
  onSessionSelect: (sessionId: number) => void
  onNewChat: () => void
  userId: number
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export default function ChatHistorySidebar({
  currentSessionId,
  onSessionSelect,
  onNewChat,
  userId,
  isCollapsed,
  onToggleCollapse,
}: ChatHistorySidebarProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchSessions = async () => {
    try {
      const response = await fetch(`/api/chat-sessions?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setSessions(data)
      }
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [userId])

  const handleDeleteSession = async (sessionId: number) => {
    if (!confirm("Are you sure you want to delete this chat?")) return

    try {
      const response = await fetch(`/api/chat-sessions/${sessionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId))
        if (currentSessionId === sessionId) {
          onNewChat()
        }
      }
    } catch (error) {
      console.error("Failed to delete session:", error)
    }
  }

  const handleRenameSession = async (sessionId: number, newTitle: string) => {
    if (!newTitle.trim()) return

    try {
      const response = await fetch(`/api/chat-sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      })

      if (response.ok) {
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, title: newTitle.trim() } : s)))
        setEditingId(null)
      }
    } catch (error) {
      console.error("Failed to rename session:", error)
    }
  }

  const startEditing = (session: ChatSession) => {
    setEditingId(session.id)
    setEditTitle(session.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  if (isCollapsed) {
    return (
      <div className="w-12 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="m-2 p-2 h-8 w-8">
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onNewChat} className="m-2 p-2 h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Chat History</h2>
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-1 h-6 w-6">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={onNewChat} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No chat history yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => onSessionSelect(session.id)}
                >
                  {editingId === session.id ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 h-6 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRenameSession(session.id, editTitle)
                          } else if (e.key === "Escape") {
                            cancelEditing()
                          }
                        }}
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleRenameSession(session.id, editTitle)}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={cancelEditing}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                            {session.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(session.updatedAt)} • {session.messageCount} messages
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              startEditing(session)
                            }}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteSession(session.id)
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
