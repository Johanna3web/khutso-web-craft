import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Khutso Web Design's friendly assistant chatbot. You help visitors learn about the web design services offered.

Key facts about Khutso Web Design:
- Affordable websites and portfolios for small businesses, individuals, and startups
- Services include: website design, portfolio sites, e-commerce stores, landing pages
- Based in South Africa
- Contact: johannasegoapa@gmail.com | WhatsApp: +27 64 709 9067
- Technologies: React, modern web standards, mobile-first design
- Focus on clean code, fast performance, and responsive design

Pricing:
- Starter (Landing Page): R500 — single-page site, mobile responsive, contact form, 3-day delivery
- Standard (Multi-Page Site): R1,200 — up to 5 pages, custom design, SEO basics, 5-day delivery
- Premium (Full Website + Extras): R2,500 — unlimited pages, animations, CMS/blog, priority support, 7-day delivery

Be helpful, concise, and friendly. If asked about something unrelated to web design services, politely redirect the conversation. Always encourage visitors to get in touch for a quote.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai-gateway.lovable.dev/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI gateway error [${response.status}]: ${errText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
