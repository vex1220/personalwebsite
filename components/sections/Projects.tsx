"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CodeSnippet from "@/components/ui/CodeSnippet";

type VoteState = "up" | "down" | null;
type ChatMessage = {
  id: number;
  user: string;
  text: string;
  own: boolean;
  upvotes: number;
  voted: VoteState;
  reactions: Record<string, number>;
  reacted: Record<string, boolean>;
  time: string;
};

const INITIAL_POSTS = [
  { id: 0, location: "FSU Campus", user: "@vex1220", title: "Strozier closing early tonight 🔒", body: "Anyone know if the side entrance stays open? Need to grab my laptop charger before 10pm", upvotes: 24, downvotes: 2, comments: 7, voted: null as VoteState, time: "12m ago" },
  { id: 1, location: "Landis Green", user: "@noles23", title: "Free food outside Union rn 🍕", body: "Some club event, first come first serve. At least 50 boxes out there", upvotes: 89, downvotes: 5, comments: 31, voted: null as VoteState, time: "3m ago" },
  { id: 2, location: "College Town", user: "@tally_local", title: "Anyone at Township tonight?", body: "Heard they have a DJ tonight. Line moving fast?", upvotes: 17, downvotes: 1, comments: 5, voted: null as VoteState, time: "28m ago" },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, user: "@noles23", text: "Anyone else notice the wifi in Williams is down again?", own: false, upvotes: 5, voted: null, reactions: { "😭": 4 }, reacted: {}, time: "just now" },
  { id: 2, user: "@cs_junior", text: "Yeah been down since like 9am lol use your hotspot", own: false, upvotes: 1, voted: null, reactions: {}, reacted: {}, time: "1m ago" },
  { id: 3, user: "@vex1220", text: "IT said they're fixing it by 2pm 🙏", own: true, upvotes: 0, voted: null, reactions: {}, reacted: {}, time: "just now" },
];

const REACTION_OPTIONS = ["😭", "🔥", "💀", "👀"];

function ProximaMockup() {
  const [tab, setTab] = useState<"feed" | "chat">("feed");
  const [navActive, setNavActive] = useState(0);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [emojiPickerFor, setEmojiPickerFor] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const votePost = useCallback((id: number, dir: "up" | "down") => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const same = p.voted === dir;
        return {
          ...p,
          upvotes: p.upvotes + (dir === "up" ? (same ? -1 : p.voted === "down" ? 1 : 1) : 0),
          downvotes: p.downvotes + (dir === "down" ? (same ? -1 : p.voted === "up" ? 1 : 1) : 0),
          voted: same ? null : dir,
        };
      })
    );
  }, []);

  const voteMsg = useCallback((id: number, dir: "up" | "down") => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const same = m.voted === dir;
        return {
          ...m,
          upvotes: m.upvotes + (dir === "up" ? (same ? -1 : 1) : m.voted === "up" ? -1 : 0),
          voted: same ? null : dir,
        };
      })
    );
  }, []);

  const reactMsg = useCallback((id: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const already = m.reacted[emoji];
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: (m.reactions[emoji] ?? 0) + (already ? -1 : 1),
          },
          reacted: { ...m.reacted, [emoji]: !already },
        };
      })
    );
    setEmojiPickerFor(null);
  }, []);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "@vex1220", text, own: true, upvotes: 0, voted: null, reactions: {}, reacted: {}, time: "just now" },
    ]);
    setInput("");
  }, [input]);

  const navItems = [
    { icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>, tab: "feed" as const },
    { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, tab: null },
    { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, tab: "chat" as const },
    { icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>, tab: null },
  ];

  return (
    <div className="flex flex-col items-center" onClick={() => setEmojiPickerFor(null)}>
      {/* Phone frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-[#1a1a2e]"
        style={{ width: 240, height: 500, background: "#f8fafc" }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 pt-2 pb-1 bg-white" style={{ fontSize: 9 }}>
          <span className="font-semibold text-[#0f172a]">9:41</span>
          <div className="flex gap-1 items-center">
            <svg width="10" height="8" viewBox="0 0 10 8"><rect x="0" y="3" width="2" height="5" fill="#0f172a" rx="0.5"/><rect x="2.5" y="2" width="2" height="6" fill="#0f172a" rx="0.5"/><rect x="5" y="1" width="2" height="7" fill="#0f172a" rx="0.5"/><rect x="7.5" y="0" width="2" height="8" fill="#0f172a" rx="0.5"/></svg>
            <svg width="10" height="8" viewBox="0 0 12 10"><path d="M6 2C8.5 2 10.7 3.2 12 5L10 6.5C9.1 5.6 7.6 5 6 5s-3.1.6-4 1.5L0 5C1.3 3.2 3.5 2 6 2z" fill="#0f172a"/><path d="M6 5.5C7.4 5.5 8.6 6.1 9.5 7L7.5 8.5C7 8.2 6.5 8 6 8s-1 .2-1.5.5L2.5 7C3.4 6.1 4.6 5.5 6 5.5z" fill="#0f172a"/><circle cx="6" cy="9.5" r="1" fill="#0f172a"/></svg>
            <svg width="16" height="8" viewBox="0 0 20 10"><rect x="0" y="1" width="17" height="8" rx="2" stroke="#0f172a" strokeWidth="1.2" fill="none"/><rect x="1" y="2" width="12" height="6" rx="1" fill="#0f172a"/><path d="M18 3.5v3c.8-.4 1.3-1 1.3-1.5s-.5-1.1-1.3-1.5z" fill="#0f172a"/></svg>
          </div>
        </div>

        {/* App header */}
        <div className="px-4 py-2 bg-white border-b border-[#f1f5f9] flex items-center justify-between">
          <span className="font-bold text-sm text-[#3b4fd8] tracking-tight">proxima</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded-full bg-[#eff6ff] flex items-center justify-center cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b4fd8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#eff6ff] flex items-center justify-center cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b4fd8" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white border-b border-[#f1f5f9]">
          {(["feed", "chat"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-1.5 text-center transition-colors cursor-pointer"
              style={{ fontSize: 10, fontWeight: 600, color: tab === t ? "#3b4fd8" : "#6b7280", borderBottom: tab === t ? "2px solid #3b4fd8" : "2px solid transparent" }}
            >
              {t === "feed" ? "Feed" : "Chat"}
            </button>
          ))}
        </div>

        {/* Screen content */}
        <div className="overflow-hidden" style={{ height: 368 }}>
          {tab === "feed" ? (
            <div className="overflow-y-auto h-full bg-[#f8fafc] px-2 py-2 space-y-2">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-3 shadow-sm border border-[#f1f5f9]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#3b82f6] font-semibold" style={{ fontSize: 9 }}>{post.location}</span>
                    <span className="text-[#6b7280]" style={{ fontSize: 9 }}>{post.user}</span>
                  </div>
                  <p className="font-bold text-[#0f172a] leading-tight mb-1" style={{ fontSize: 11 }}>{post.title}</p>
                  <p className="text-[#6b7280] leading-snug mb-2" style={{ fontSize: 10 }}>{post.body}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Upvote */}
                      <button
                        onClick={(e) => { e.stopPropagation(); votePost(post.id, "up"); }}
                        className="flex items-center gap-0.5 cursor-pointer"
                        style={{ background: "none", border: "none", padding: 0 }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill={post.voted === "up" ? "#22c55e" : "none"} stroke={post.voted === "up" ? "#22c55e" : "#9ca3af"} strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                        <span style={{ fontSize: 9, color: post.voted === "up" ? "#22c55e" : "#6b7280", fontWeight: post.voted === "up" ? 700 : 400 }}>{post.upvotes}</span>
                      </button>
                      {/* Downvote */}
                      <button
                        onClick={(e) => { e.stopPropagation(); votePost(post.id, "down"); }}
                        className="flex items-center gap-0.5 cursor-pointer"
                        style={{ background: "none", border: "none", padding: 0 }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill={post.voted === "down" ? "#ef4444" : "none"} stroke={post.voted === "down" ? "#ef4444" : "#9ca3af"} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        <span style={{ fontSize: 9, color: post.voted === "down" ? "#ef4444" : "#6b7280" }}>{post.downvotes}</span>
                      </button>
                      {/* Comments */}
                      <div className="flex items-center gap-0.5">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span style={{ fontSize: 9, color: "#6b7280" }}>{post.comments}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 9, color: "#6b7280" }}>{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full bg-[#f8fafc]">
              {/* Chat header */}
              <div className="px-3 py-2 bg-white border-b border-[#f1f5f9]">
                <p className="font-semibold text-[#0f172a]" style={{ fontSize: 11 }}>FSU Campus · General</p>
                <p style={{ fontSize: 9, color: "#22c55e" }}>● 34 online</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.own ? "items-end" : "items-start"}`}>
                    <span style={{ fontSize: 9, color: "#6b7280", marginBottom: 2 }}>{msg.user}</span>
                    <div
                      className={`px-3 py-2 shadow-sm ${msg.own ? "rounded-2xl rounded-tr-sm" : "bg-white rounded-2xl rounded-tl-sm"}`}
                      style={{ maxWidth: "80%", background: msg.own ? "#eff6ff" : "white" }}
                    >
                      <p style={{ fontSize: 11, color: "#1e293b", lineHeight: 1.4 }}>{msg.text}</p>
                      <div className={`flex items-center gap-1.5 mt-1 ${msg.own ? "justify-end" : ""}`}>
                        {!msg.own && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); voteMsg(msg.id, "up"); }}
                              className="flex items-center gap-0.5 cursor-pointer"
                              style={{ background: "none", border: "none", padding: 0 }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill={msg.voted === "up" ? "#22c55e" : "none"} stroke={msg.voted === "up" ? "#22c55e" : "#9ca3af"} strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                              <span style={{ fontSize: 8, color: msg.voted === "up" ? "#22c55e" : "#6b7280" }}>{msg.upvotes}</span>
                            </button>
                          </>
                        )}
                        <span style={{ fontSize: 8, color: "#6b7280" }}>{msg.time}</span>
                        {msg.own && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3b4fd8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                    </div>
                    {/* Reactions row */}
                    <div className="flex gap-1 mt-1 flex-wrap" onClick={(e) => e.stopPropagation()}>
                      {Object.entries(msg.reactions).filter(([, count]) => count > 0).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          onClick={() => reactMsg(msg.id, emoji)}
                          className="px-1.5 py-0.5 rounded-full border cursor-pointer transition-all"
                          style={{
                            fontSize: 9,
                            background: msg.reacted[emoji] ? "#eff6ff" : "#f8fafc",
                            borderColor: msg.reacted[emoji] ? "#3b4fd8" : "#e2e8f0",
                            color: msg.reacted[emoji] ? "#3b4fd8" : "#6b7280",
                          }}
                        >
                          {emoji} {count}
                        </button>
                      ))}
                      {/* Add reaction */}
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setEmojiPickerFor(emojiPickerFor === msg.id ? null : msg.id); }}
                          className="px-1.5 py-0.5 rounded-full border cursor-pointer"
                          style={{ fontSize: 9, background: "#f8fafc", borderColor: "#e2e8f0", color: "#9ca3af" }}
                        >
                          +
                        </button>
                        {emojiPickerFor === msg.id && (
                          <div
                            className="absolute bottom-full mb-1 flex gap-1 bg-white rounded-xl shadow-lg border border-[#f1f5f9] px-2 py-1.5 z-10"
                            style={{ left: msg.own ? "auto" : 0, right: msg.own ? 0 : "auto" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {REACTION_OPTIONS.map((e) => (
                              <button key={e} onClick={() => reactMsg(msg.id, e)} className="cursor-pointer text-base hover:scale-125 transition-transform" style={{ background: "none", border: "none", padding: 0, lineHeight: 1 }}>
                                {e}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input bar */}
              <div className="px-2 py-2 bg-white border-t border-[#f1f5f9] flex items-center gap-1.5">
                <div className="flex-1 rounded-full bg-[#f1f5f9] px-3 py-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Say something..."
                    className="w-full bg-transparent outline-none"
                    style={{ fontSize: 10, color: "#1e293b" }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-opacity"
                  style={{ background: input.trim() ? "#3b4fd8" : "#c7d2fe", border: "none", padding: 0, opacity: input.trim() ? 1 : 0.6 }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#f1f5f9] flex justify-around items-center px-2 py-2">
          {navItems.map((item, i) => {
            const active = navActive === i;
            const color = active ? "#3b4fd8" : "#9ca3af";
            return (
              <button
                key={i}
                onClick={() => {
                  setNavActive(i);
                  if (item.tab) setTab(item.tab);
                }}
                className="flex flex-col items-center gap-0.5 cursor-pointer"
                style={{ background: "none", border: "none", padding: "2px 4px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                  {item.icon}
                </svg>
                {active && <div className="w-1 h-1 rounded-full" style={{ background: "#3b4fd8" }} />}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-[#999] mt-3 font-mono">interactive demo · try voting &amp; chatting</p>
    </div>
  );
}

const THROTTLE_CODE = `// proxima/backend — WebSocket location handler
const THROTTLE_MS = 10_000;
const throttleMap = new Map<string, number>();

export async function handleLocationUpdate(
  socket: Socket,
  payload: LocationPayload
): Promise<void> {
  const now = Date.now();
  const lastUpdate = throttleMap.get(socket.id) ?? 0;

  if (now - lastUpdate < THROTTLE_MS) return;
  throttleMap.set(socket.id, now);

  await redis.setEx(
    \`loc:\${socket.id}\`,
    TTL_SECONDS,
    JSON.stringify(payload)
  );

  socket
    .to(\`room:\${payload.locationId}\`)
    .emit("location:update", payload);
}`;

const HIGHLIGHTS = [
  "VIPER architecture for strict layer separation",
  "Socket.io real-time engine with 10s location throttle",
  "Redis-backed GPS seeding for instant Feed mount",
  "Interactive map clustering via react-native-maps",
  "OpenAI-powered AI content moderation pipeline",
  "Multi-brand theming engine (Light/Dark) with SecureStore",
];

const STACK = [
  "React Native",
  "Expo ~54",
  "TypeScript",
  "Socket.io",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Prisma ORM",
  "AWS S3",
  "OpenAI API",
  "Railway",
];

const CHESS_CODE = `// Chess.h — Class hierarchy for chess pieces
class Knight {
  private:
    int x, y;
  public:
    Knight(int x, int y);
    void Move(int movex, int movey);
    int GetX();
    int Gety();
};

class Rook {
  private:
    int x, y;
  public:
    Rook(int x, int y);
    void Move(int movex, int movey);
    int GetX();
    int Gety();
};

class Bishop {
  private:
    int x, y;
  public:
    Bishop(int x, int y);
    void Move(int movex, int movey);
    int GetX();
    int Gety();
};

class Queen {
  private:
    int x, y;
  public:
    Queen(int x, int y);
    void Move(int movex, int movey);
    int GetX();
    int Gety();
};

void intro();
void gameboard();
bool SpotIsTaken(int x, int y);`;

const CHESS_GAMEBOARD = `// Chess_driver.cpp — 10x10 board renderer
void gameboard() {
  for (int i = 0; i < 10; i++) {
    for (int p = 0; p < 10; p++) {
      if (R.GetX() == p && 9 - R.Gety() == i)
        cout << "R ";
      else if (B.GetX() == p && 9 - B.Gety() == i)
        cout << "B ";
      else if (Q.GetX() == p && 9 - Q.Gety() == i)
        cout << "Q ";
      else if (K.GetX() == p && 9 - K.Gety() == i)
        cout << "K ";
      else
        cout << "X ";
    }
    cout << endl;
  }
}`;

const ZAPPY_STACK = [
  "Python",
  "Pygame",
  "Pygbag",
  "WebAssembly",
  "asyncio",
];

function ZappyEmbed() {
  return (
    <div className="card-dashed p-8 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-medium text-black mb-1">Zappy</h3>
          <p className="text-sm text-[#666]">
            Pygame Mini-Game Collection — Playable in Browser
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-[#999]">
            CEN4090L Capstone Project
          </p>
        </div>
      </div>

      <p className="text-sm text-[#666] leading-relaxed mb-6">
        A collection of retro mini-games built with Pygame, compiled to
        WebAssembly via Pygbag so it runs directly in the browser. Features
        Flappy Zappy, Doodle Jump, Forest Survival, and a Boss Arena.
      </p>

      <div
        className="relative w-full rounded-lg overflow-hidden border border-dashed border-[#e5e5e5]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          src="/zappy/index.html"
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          tabIndex={0}
          title="Zappy — Pygame in Browser"
        />
      </div>

      <div className="mt-6">
        <p className="section-label mb-3">Built With</p>
        <div className="flex flex-wrap gap-2">
          {ZAPPY_STACK.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono text-[#444] bg-white border border-[#e5e5e5] rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-container mx-auto">
        <ScrollReveal className="mb-12">
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-black">
            Case Study: Proxima
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {/* Main case study card */}
          <ScrollReveal>
            <div className="card-dashed p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-medium text-black mb-1">
                    <a
                      href="https://proximachat.com"
                      target="_blank"
                      rel="noreferrer"
                      className="link-accent"
                    >
                      Proxima
                    </a>
                  </h3>
                  <p className="text-sm text-[#666]">
                    Location-Based Social Platform
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-[#999]">
                    Lead Developer · UI Architect
                  </p>
                  <p className="font-mono text-xs text-[#999] mt-0.5">
                    Jan 2026 – Present
                  </p>
                  <a
                    href="https://github.com/vex1220"
                    target="_blank"
                    rel="noreferrer"
                    className="link-accent text-xs font-mono mt-1 inline-block"
                  >
                    github.com/vex1220 ↗
                  </a>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Left: description + highlights */}
                <div>
                  <p className="text-sm text-[#666] leading-relaxed mb-6">
                    A real-time, location-based social platform where users join
                    chatrooms tied to physical locations. Built with a strict
                    VIPER architecture for modularity, Socket.io for live
                    updates, and OpenAI for content moderation.
                  </p>

                  <ul className="space-y-2 mb-8">
                    {HIGHLIGHTS.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-[#444]">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[#09f] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <p className="section-label mb-3">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {STACK.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono text-[#444] bg-white border border-[#e5e5e5] rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Proxima UI mockup */}
                <ProximaMockup />
              </div>
            </div>
          </ScrollReveal>

          {/* Zappy — playable game embed */}
          <ScrollReveal delay={0.1}>
            <ZappyEmbed />
          </ScrollReveal>

          {/* Chess Program — first ever project */}
          <ScrollReveal delay={0.15}>
            <div className="card-dashed p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-medium text-black mb-1">
                    Chess Piece Simulator
                  </h3>
                  <p className="text-sm text-[#666]">
                    Where It All Started
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-[#999]">
                    First Program Ever
                  </p>
                  <p className="font-mono text-xs text-[#999] mt-0.5">
                    Fall 2023 · COP 3014
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#666] leading-relaxed mb-6">
                A terminal-based chess piece movement simulator built for my first
                programming assignment. Four piece classes (Knight, Rook, Bishop,
                Queen) move on a 10x10 grid with collision detection and
                rule-based validation. Simple, scrappy, and the project that
                started everything.
              </p>

              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <CodeSnippet
                  code={CHESS_CODE}
                  filename="Chess.h"
                  language="C++"
                />
                <CodeSnippet
                  code={CHESS_GAMEBOARD}
                  filename="Chess_driver.cpp"
                  language="C++"
                />
              </div>

              <div className="mt-6">
                <p className="section-label mb-3">Built With</p>
                <div className="flex flex-wrap gap-2">
                  {["C++", "OOP", "Header Files", "CLI"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono text-[#444] bg-white border border-[#e5e5e5] rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* GitHub link card */}
          <ScrollReveal delay={0.2}>
            <motion.a
              href="https://github.com/vex1220"
              target="_blank"
              rel="noreferrer"
              whileHover={{ backgroundColor: "#f5f5f5" }}
              transition={{ duration: 0.15 }}
              className="block card-dashed p-6 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black group-hover:text-[#09f] transition-colors">
                    More projects on GitHub ↗
                  </p>
                  <p className="text-sm text-[#999] mt-1">
                    github.com/vex1220
                  </p>
                </div>
                <span className="font-mono text-xs text-[#d4d4d4]">
                  Open source
                </span>
              </div>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
