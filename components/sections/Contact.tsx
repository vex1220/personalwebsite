"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LINKS = [
  { label: "GitHub", value: "github.com/vex1220", href: "https://github.com/vex1220" },
  { label: "LinkedIn", value: "linkedin.com/in/ben-ashir-g", href: "https://linkedin.com/in/ben-ashir-g-253a74264" },
];

export default function Contact() {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_nv9ks78",
        "template_rpwphdq",
        {
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "p172AA5OtBl5N1l2A"
      );
      setStatus("sent");
      setForm({ email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const filled = form.email.trim() && form.subject.trim() && form.message.trim();
  const sending = status === "sending";

  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <p className="section-label mb-3">Get In Touch</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-black mb-4">
              {"Let's work together."}
            </h2>
            <p className="text-base text-[#666] leading-relaxed max-w-sm mb-10">
              Currently open to full-time software engineering roles starting in
              2026. If you have a project or opportunity in mind, reach out.
            </p>

            <div className="space-y-4">
              {LINKS.map(({ label, value, href }) => (
                <div key={label} className="card-dashed p-5">
                  <p className="section-label mb-2">{label}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-accent text-sm font-medium"
                  >
                    {value} ↗
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card-dashed p-6 md:p-8">
              <p className="section-label mb-5">Send a Message</p>
              {status === "sent" ? (
                <div className="py-10 text-center">
                  <p className="text-sm font-medium text-black mb-1">Message sent.</p>
                  <p className="text-sm text-[#666]">I'll get back to you soon.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-[#09f] underline underline-offset-2"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="section-label mb-1.5 block">Your Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-sm rounded-md border border-[#e5e5e5] bg-white text-black placeholder-[#bbb] outline-none focus:border-[#09f] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="section-label mb-1.5 block">Subject</label>
                    <input
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-3 py-2 text-sm rounded-md border border-[#e5e5e5] bg-white text-black placeholder-[#bbb] outline-none focus:border-[#09f] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="section-label mb-1.5 block">Message</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className="w-full px-3 py-2 text-sm rounded-md border border-[#e5e5e5] bg-white text-black placeholder-[#bbb] outline-none focus:border-[#09f] transition-colors resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={!filled || sending}
                    className="w-full py-2.5 text-sm font-medium rounded-md transition-all"
                    style={{
                      background: filled && !sending ? "#000" : "#f5f5f5",
                      color: filled && !sending ? "#fff" : "#bbb",
                      cursor: filled && !sending ? "pointer" : "not-allowed",
                    }}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-container mx-auto mt-20 pt-8 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-[#999]">
          Ben Ashir Georges · Tallahassee, FL
        </p>
      </div>
    </section>
  );
}
