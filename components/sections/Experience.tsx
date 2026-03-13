import ScrollReveal from "@/components/ui/ScrollReveal";

const JOBS = [
  {
    company: "NWF Health Network",
    role: "Contract Intern",
    period: "Mar 2025 – Aug 2025",
    location: "525 N Martin Luther King Jr Blvd, Tallahassee, FL 32301",
    points: [
      "Led contract drafting, review, and compliance tracking workflows",
      "Maintained healthcare compliance databases with high accuracy",
      "Processed contract modifications with cross-functional teams",
    ],
  },
  {
    company: "Township",
    role: "Security",
    period: "May 2025 – Aug 2025",
    location: "619 S Woodward Ave, Tallahassee, FL 32304",
    points: [
      "Served as a frontline representative of the brand, balancing rigorous security protocols with elite customer service",
      "Orchestrated the secure movement of high-capacity crowds in a fast-paced, multi-faceted environment",
      "Acted as the primary point of contact for emergency response coordination and incident reporting, maintaining a 100% resolution rate for on-site disputes",
      "Conducted meticulous identification verification and access control, upholding the highest standards of legal compliance and venue integrity",
    ],
  },
  {
    company: "NCH Healthcare System",
    role: "IT Intern",
    period: "Feb 2024 – Aug 2024",
    location: "1100 Immokalee Rd, Naples, FL 34110",
    points: [
      "Built Python automation scripts to streamline IT operations and reporting",
      "Managed healthcare infrastructure including network and endpoint security",
      "Provided enterprise user support across hospital systems",
    ],
  },
  {
    company: "Best Buy",
    role: "Sales Consultant",
    period: "May 2023 – Aug 2023",
    location: "6325 Naples Blvd, Naples, FL 34109",
    points: [
      "Ranked top 15 in the micro-market for individual sales performance",
      "Leveraged deep product knowledge to provide technical recommendations",
    ],
  },
  {
    company: "Publix",
    role: "Cashier",
    period: "Aug 2021 – May 2022",
    location: "6325 Naples Blvd, Naples, FL 34109",
    points: [
      "Acted as the final point of contact in the customer journey, ensuring a seamless and positive brand experience through elite service and communication",
      "Managed high-volume financial transactions with 100% till accuracy, maintaining a meticulous record of fiscal integrity",
      "Cultivated foundational professional habits in time management, discipline, and accountability within a fast-paced, high-traffic environment",
      "Recognized by management for consistent excellence in conflict resolution and for maintaining a high-performance workstation",
    ],
  },
];

export default function Experience() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-container mx-auto">
        <ScrollReveal className="mb-12">
          <p className="section-label mb-3">Background</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-black">
            Experience & Education
          </h2>
        </ScrollReveal>

        {/* Work experience */}
        <div className="space-y-4 mb-12">
          {JOBS.map((job, i) => (
            <ScrollReveal key={job.company} delay={i * 0.07}>
              <div className="card-dashed p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <p className="font-medium text-black">{job.role}</p>
                    <p className="text-sm text-[#666] mt-0.5">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-[#999] mt-0.5">
                    {job.period}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-[#666] flex items-start gap-3"
                    >
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#d4d4d4] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Education */}
        <ScrollReveal delay={0.2}>
          <div className="card-dashed p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
              <div>
                <p className="font-medium text-black">
                  Florida State University
                </p>
                <p className="text-sm text-[#666] mt-0.5">
                  B.S. Computer Science · Minor: Business Analytics
                </p>
              </div>
              <p className="font-mono text-xs text-[#999]">
                Expected Aug 2026
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {[
                ["Level", "Senior"],
                ["Location", "Tallahassee, FL"],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="section-label mb-1">{label}</p>
                  <p className="text-sm text-black font-medium">{val}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Dean's List ×3",
                "ACM Member",
                "FSU Innovation Hub",
                "Delta Chi",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-xs font-mono text-[#666] bg-white border border-[#e5e5e5] rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
