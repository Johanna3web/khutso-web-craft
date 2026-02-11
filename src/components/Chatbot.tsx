import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! 👋 I'm Khutso's assistant. Ask me anything about our web design services, pricing, or portfolio!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { messages: updated.map((m) => ({ role: m.role, content: m.content })) },
      });

      if (error || data?.error) throw new Error(data?.error || "Failed");

      setMessages([...updated, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        aria-label="Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-secondary/50">
              <p className="font-display font-bold text-foreground text-sm">Khutso Assistant</p>
              <p className="text-muted-foreground text-xs">Ask about services & pricing</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-xl px-3 py-2 text-sm text-muted-foreground">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-accent text-accent-foreground rounded-lg px-3 py-2 hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
