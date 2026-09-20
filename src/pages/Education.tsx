import { useVisible } from "../utils/useVisible";

const coursework = [
  { name: "Data Structures & Algorithms", grade: "A", icon: "🔁" },
  { name: "Design & Analysis of Algorithms", grade: "A", icon: "⚡" },
  { name: "Object-Oriented Programming", grade: "A+", icon: "🧩" },
  { name: "Database Systems", grade: "A", icon: "🗄️" },
  { name: "Software Engineering", grade: "A", icon: "🏗️" },
  { name: "Artificial Intelligence", grade: "A", icon: "🤖" },
  { name: "Information Security", grade: "A", icon: "🛡️" },
  { name: "Operating Systems", grade: "A-", icon: "💻" },
  { name: "Computer Networks", grade: "A", icon: "🌐" },
  { name: "Web Technologies", grade: "A", icon: "🕸️" },
  { name: "Computer Organization", grade: "A", icon: "🔧" },
  { name: "Discrete Mathematics", grade: "A", icon: "📐" },
];

const semesters = [
  { num: "1st", gpa: "3.94", status: "Completed", highlight: false },
  { num: "2nd", gpa: "3.93", status: "Completed", highlight: false },
  { num: "3rd", gpa: "3.94", status: "Completed", highlight: false },
  { num: "4th", gpa: "4.00", status: "Completed", highlight: true },
  { num: "5th", gpa: "4.00", status: "Completed", highlight: true },
  { num: "6th", gpa: "4.00", status: "Completed", highlight: true },
];

export default function Education() {
  const hero = useVisible();
  const edu = useVisible(120);
  const semHeader = useVisible(100);
  const courseHeader = useVisible(100);
  const achHeader = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Academic qualifications
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Education & Performance
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            Bachelor of Science in Computer Science with consistent academic distinction and top-tier semester rankings.
          </p>
        </div>

        {/* Main University Card */}
        <div
          ref={edu.ref}
          style={{
            background: "var(--card)",
            borderRadius: "20px",
            padding: "32px 36px",
            marginBottom: "48px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "36px",
            alignItems: "center",
            opacity: edu.visible ? 1 : 0,
            transform: edu.visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
          className="edu-grid flowing-card"
        >
          <div>
            <div style={{ display: "inline-flex", padding: "3px 12px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "11px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "14px" }}>
              2023 — 2027
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
              Sir Syed University of Engineering & Technology
            </h2>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--accent)", marginBottom: "14px" }}>
              BS in Computer Science (BSCS)
            </div>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              Completed 6 semesters with top distinction. Core specialization in software architecture, distributed systems, and backend engineering.
            </p>
          </div>

          {/* CGPA Badge Box */}
          <div
            style={{
              background: "var(--tint)",
              borderRadius: "16px",
              padding: "24px 28px",
              textAlign: "center",
            }}
            className="edu-cgpa-badge flowing-card"
          >
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--tint-ink)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
              Cumulative GPA
            </div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "48px", fontWeight: 700, color: "var(--accent)", lineHeight: 1.1 }}>
              3.97
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
              Scale: 4.00
            </div>
          </div>
        </div>

        {/* Semester by Semester */}
        <div style={{ marginBottom: "64px" }}>
          <div ref={semHeader.ref} style={{ opacity: semHeader.visible ? 1 : 0, transform: semHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Academic progress
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Semester Performance
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 140px), 1fr))", gap: "12px" }}>
            {semesters.map((sem, i) => (
              <SemesterCard key={sem.num} sem={sem} index={i} />
            ))}
          </div>
        </div>

        {/* Relevant Coursework */}
        <div style={{ marginBottom: "64px" }}>
          <div ref={courseHeader.ref} style={{ opacity: courseHeader.visible ? 1 : 0, transform: courseHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Core curriculum
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Relevant Coursework
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "12px" }}>
            {coursework.map((course, i) => (
              <CourseworkCard key={course.name} course={course} index={i} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div ref={achHeader.ref} style={{ opacity: achHeader.visible ? 1 : 0, transform: achHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Honors & awards
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Academic Honors
            </h2>
          </div>
          <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "16px" }}>
            {[
              { icon: "🎓", title: "Scholarship every semester", desc: "Awarded merit scholarships in every completed semester based on academic rank." },
              { icon: "🏆", title: "Best semester project OOP", desc: "Best Semester Project Award in Object-Oriented Programming (2nd semester)." },
              { icon: "🏆", title: "Best project in DB & OS", desc: "Best Semester Project Award in Database Systems and Operating Systems (4th semester)." },
              { icon: "✨", title: "Spark of the Event Award", desc: "Recognized for leading technical events and student workshops at SMEC." },
            ].map((ach, i) => (
              <AchievementCard key={ach.title} ach={ach} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SemesterCard({ sem, index }: { sem: typeof semesters[0]; index: number }) {
  const { ref, visible } = useVisible(index * 70);

  return (
    <div
      ref={ref}
      className="flowing-card"
      style={{
        padding: "16px 14px",
        background: "var(--card)",
        borderRadius: "14px",
        textAlign: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        transform: visible ? "translateY(0)" : "translateY(16px)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "12px", color: "var(--muted)", marginBottom: "4px" }}>
        {sem.num} Semester
      </div>
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "22px", fontWeight: 700, color: sem.highlight ? "var(--accent)" : "var(--ink)" }}>
        {sem.gpa}
      </div>
      <div style={{ fontFamily: "'Newsreader', serif", fontSize: "11px", color: sem.highlight ? "var(--accent)" : "var(--muted)", marginTop: "2px" }}>
        {sem.highlight ? "★ 4.00 Max" : "Completed"}
      </div>
    </div>
  );
}

function CourseworkCard({ course, index }: { course: typeof coursework[0]; index: number }) {
  const { ref, visible } = useVisible(index * 50);

  return (
    <div
      ref={ref}
      className="flowing-card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        background: "var(--card)",
        borderRadius: "12px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2 }}>
        <span>{course.icon}</span>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
          {course.name}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--accent)",
          background: "var(--tint)",
          padding: "2px 8px",
          borderRadius: "6px",
          border: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {course.grade}
      </span>
    </div>
  );
}

function AchievementCard({ ach, index }: { ach: { icon: string; title: string; desc: string }; index: number }) {
  const { ref, visible } = useVisible(index * 80);

  return (
    <div
      ref={ref}
      className="flowing-card"
      style={{
        padding: "22px",
        background: "var(--card)",
        borderRadius: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "10px", position: "relative", zIndex: 2 }}>{ach.icon}</div>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em", position: "relative", zIndex: 2 }}>
        {ach.title}
      </h3>
      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.55, position: "relative", zIndex: 2 }}>
        {ach.desc}
      </p>
    </div>
  );
}
