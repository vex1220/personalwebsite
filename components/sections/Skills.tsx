import ScrollReveal from "@/components/ui/ScrollReveal";

const CATEGORIES = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C++", "Rust", "SQL", "HTML/CSS"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React Native", "Expo", "React", "NativeWind", "Tailwind CSS", "Framer Motion", "Reanimated"],
  },
  {
    label: "Backend & DevOps",
    items: ["Node.js", "Express", "PostgreSQL", "Redis", "Socket.io", "Prisma ORM", "AWS S3", "Railway"],
  },
  {
    label: "Tools & Other",
    items: ["Git", "Docker", "OpenAI API", "Power BI", "AutoCAD", "Figma", "REST API Design", "VIPER Architecture"],
  },
];

const PROFESSIONAL = [
  {
    label: "Communication & Support",
    description:
      "Experienced in customer-facing and end-user support across healthcare IT, retail, and operations. Able to explain technical concepts clearly to non-technical users and stay composed under pressure.",
  },
  {
    label: "Cross-functional Collaboration",
    description:
      "Worked across IT, procurement, and finance teams during contract administration at NWF Health Network. Comfortable operating in multi-team environments and translating between technical and business stakeholders.",
  },
  {
    label: "Leadership & Ownership",
    description:
      "Led financial analysis for Delta Chi fundraising efforts, contributing to over $5,000 raised. Demonstrates accountability, coordination, and the ability to take ownership of outcomes.",
  },
  {
    label: "Attention to Detail",
    description:
      "Tracked contract renewals, maintained compliance databases, and supported audits at NWF. Strong documentation discipline and organizational precision in high-accountability environments.",
  },
  {
    label: "Adaptability",
    description:
      "Moved fluidly between healthcare IT, contract administration, sales, and community leadership. Able to learn new environments quickly and contribute in both technical and non-technical settings.",
  },
  {
    label: "Initiative & Problem-solving",
    description:
      "Identified repetitive workflow inefficiencies at NCH Healthcare and built Python automation scripts to address them — demonstrating proactive thinking beyond the scope of assigned tasks.",
  },
];

export default function Skills() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-container mx-auto">

        {/* Technical Skills */}
        <ScrollReveal className="mb-12">
          <p className="section-label mb-3">Capabilities</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-black">
            Technical Skills
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {CATEGORIES.map(({ label, items }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <div className="card-dashed p-6">
                <p className="section-label mb-4">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-sm text-[#444] bg-white border border-[#e5e5e5] rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-6">
          <div className="card-dashed p-6 flex flex-wrap gap-6">
            <div>
              <p className="section-label mb-1">Certifications</p>
              <p className="text-sm text-[#444]">Power BI · AutoCAD</p>
            </div>
            <div>
              <p className="section-label mb-1">Languages spoken</p>
              <p className="text-sm text-[#444]">English · Haitian Creole (Fluent)</p>
            </div>
            <div>
              <p className="section-label mb-1">Architecture patterns</p>
              <p className="text-sm text-[#444]">VIPER · REST · MVC · Layered</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Professional Skills */}
        <ScrollReveal className="mt-20 mb-12">
          <p className="section-label mb-3">Beyond the Code</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-black">
            Professional Skills
          </h2>
          <p className="text-sm text-[#666] mt-3 max-w-xl leading-relaxed">
            Beyond technical development, I bring strong communication, cross-functional
            collaboration, leadership, and operational discipline built across healthcare IT,
            contract administration, and customer-facing roles.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROFESSIONAL.map(({ label, description }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <div className="card-dashed p-6 h-full">
                <p className="section-label mb-3">{label}</p>
                <p className="text-sm text-[#666] leading-relaxed">{description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
