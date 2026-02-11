import { useState } from "react";
import { Mail, Clock, User, Lock, LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (pwd: string) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-messages", {
      body: { password: pwd },
    });
    setLoading(false);

    if (error || data?.error) {
      toast.error(data?.error || "Failed to load messages");
      setAuthenticated(false);
      return;
    }

    setMessages(data.messages || []);
    setAuthenticated(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    fetchMessages(password);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="text-accent" size={24} />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter your password to view messages</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Log In"}
          </button>
          <a href="/" className="block text-center text-muted-foreground text-xs hover:text-foreground transition-colors mt-4">
            ← Back to site
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">Messages ({messages.length})</h1>
        <button onClick={() => { setAuthenticated(false); setPassword(""); }} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors">
          <LogOut size={14} /> Logout
        </button>
      </header>
      <div className="container mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="text-accent" size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{msg.name}</p>
                      <p className="text-muted-foreground text-xs">{msg.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock size={12} />
                    {new Date(msg.created_at).toLocaleDateString("en-ZA", {
                      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
