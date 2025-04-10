import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function MessagesPage() {
  // Sample conversation data
  const conversations = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Thank you for the prescription, doctor.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "When should I come for my next appointment?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Carol Williams",
      lastMessage: "I'm feeling much better now.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      name: "David Brown",
      lastMessage: "Is it normal to have these side effects?",
      time: "Mar 10",
      unread: false,
    },
  ]

  // Sample messages for the first conversation
  const messages = [
    {
      id: 1,
      sender: "patient",
      content: "Hello Dr. Smith, I wanted to ask about my medication.",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "doctor",
      content: "Hello Alice, what would you like to know?",
      time: "10:05 AM",
    },
    {
      id: 3,
      sender: "patient",
      content: "Is it okay if I take it with food? I'm experiencing some stomach discomfort.",
      time: "10:10 AM",
    },
    {
      id: 4,
      sender: "doctor",
      content:
        "Yes, it's actually recommended to take this medication with food to reduce stomach irritation. Try taking it right after a meal.",
      time: "10:15 AM",
    },
    {
      id: 5,
      sender: "patient",
      content: "Thank you for the prescription, doctor.",
      time: "10:30 AM",
    },
  ]

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden">
      {/* Conversations list */}
      <div className="w-full md:w-80 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
        </div>
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer ${
                conversation.id === 1 ? "bg-blue-50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{conversation.name.charAt(0)}</span>
                </div>
                {conversation.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{conversation.name}</p>
                  <p className="text-xs text-gray-500">{conversation.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="hidden md:flex flex-col flex-1">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Alice Johnson</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "doctor" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === "doctor" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Empty state for mobile */}
      <div className="flex-1 flex items-center justify-center md:hidden">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Select a conversation to view messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

