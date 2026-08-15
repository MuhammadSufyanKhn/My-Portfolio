import { useVisible } from "../utils/useVisible";
import { useState } from "react";

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
  { num: "4th", gpa: "4.0", status: "Completed", highlight: true },
  { num: "5th", gpa: "4.00", status: "Completed", highlight: true },
  { num: "6th", gpa: "4.00", status: "Completed", highlight: true },
];

export default function Education() {
  const hero = useVisible();
  const edu = useVisible(200);
  const semHeader = useVisible(100);
  const courseHeader = useVisible(100);
  const achHeader = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "64px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Academic Background</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#f1f5f9", margin: 0, letterSpacing: "-2px", lineHeight: 1.1 }}>Education</h1>
        </div>

        <EduMainCard refObj={edu.ref} visible={edu.visible} />

        {/* Semester Grid */}
        <div style={{ marginBottom: "64px" }}>
          <div ref={semHeader.ref} style={{ opacity: semHeader.visible ? 1 : 0, transform: semHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#6366f1", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Academic Progress</div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 32px", letterSpacing: "-1px" }}>Semester by Semester</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 155px), 1fr))", gap: "14px" }}>
            {semesters.map((sem, i) => (
              <SemesterCard key={sem.num} sem={sem} index={i} />
            ))}
          </div>
        </div>

        {/* Coursework */}
        <div style={{ marginBottom: "64px" }}>
          <div ref={courseHeader.ref} style={{ opacity: courseHeader.visible ? 1 : 0, transform: courseHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#f59e0b", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Curriculum</div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 32px", letterSpacing: "-1px" }}>Relevant Coursework</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "12px" }}>
            {coursework.map((course, i) => (
              <CourseworkCard key={course.name} course={course} index={i} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div ref={achHeader.ref} style={{ opacity: achHeader.visible ? 1 : 0, transform: achHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#ec4899", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Highlights</div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 32px", letterSpacing: "-1px" }}>Achievements</h2>
          </div>
          <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "16px" }}>
            {[
              { icon: "🎓", title: "Scholarship Every Semester", desc: "Awarded a scholarship in every completed semester.", color: "#f59e0b" },
              { icon: "🏆", title: "Best Semester Project OOP", desc: "Best Semester Project Award in Object-Oriented Programming during the 2nd semester.", color: "#10b981" },
              { icon: "🏆", title: "Best Semester Project DB & OS", desc: "Best Semester Project Award in Database Systems and Operating Systems during the 4th semester.", color: "#6366f1" },
              { icon: "✨", title: "Spark of the Event Award", desc: "Recognized for leading the Free Fire event at SMEC.", color: "#ec4899" },
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
  const { ref, visible } = useVisible(index * 150);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 14px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: sem.highlight ? "1.5px solid rgba(16,185,129,0.3)" : `1px solid ${hovered ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "14px",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(30px) scale(0.95)",
        boxShadow: hovered ? "0 12px 28px -8px rgba(99, 102, 241, 0.15)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", gap: "6px" }}>
        <span style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "13px", fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap" }}>{sem.num} Sem</span>
        <span style={{ padding: "2px 7px", borderRadius: "100px", fontSize: "10px", fontWeight: 600, background: sem.highlight ? "rgba(16,185,129,0.15)" : "rgba(99,102,241,0.15)", color: sem.highlight ? "#34d399" : "#818cf8", whiteSpace: "nowrap" }}>{sem.status}</span>
      </div>
      <div style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f1f5f9" }}>{sem.gpa}</div>
      <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>GPA</div>
    </div>
  );
}

function CourseworkCard({ course, index }: { course: typeof coursework[0]; index: number }) {
  const { ref, visible } = useVisible(index * 80);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateX(6px)" : "translateX(0)")
          : "translateX(-20px)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <span style={{ fontSize: "20px", transition: "transform 0.3s ease", transform: hovered ? "scale(1.2)" : "scale(1)" }}>{course.icon}</span>
      <span style={{ flex: 1, fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>{course.name}</span>
      <span style={{ padding: "3px 10px", borderRadius: "100px", background: course.grade === "A+" ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.08)", color: course.grade === "A+" ? "#059669" : "#6366f1", fontSize: "11px", fontWeight: 700 }}>{course.grade}</span>
    </div>
  );
}

function AchievementCard({ ach, index }: { ach: { icon: string; title: string; desc: string; color: string }; index: number }) {
  const { ref, visible } = useVisible(index * 120);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? `${ach.color}45` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "18px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(30px) scale(0.95)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? `0 16px 32px -8px ${ach.color}20` : "none",
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: `${ach.color}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", marginBottom: "16px",
        border: `1px solid ${ach.color}30`,
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>{ach.icon}</div>
      <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px" }}>{ach.title}</h3>
      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{ach.desc}</p>
    </div>
  );
}

function EduMainCard({ refObj, visible }: { refObj: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  const [cardHover, setCardHover] = useState(false);
  const [enrolledHover, setEnrolledHover] = useState(false);

  return (
    <div ref={refObj} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s", marginBottom: "48px" }}>
      <div
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
        style={{
          padding: "32px 36px",
          background: cardHover ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${cardHover ? "rgba(16, 185, 129, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          transform: cardHover ? "translateY(-4px)" : "translateY(0)",
          boxShadow: cardHover ? "0 20px 40px -15px rgba(16, 185, 129, 0.15)" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #10b981, #6366f1, #f59e0b)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center" }} className="edu-grid">
          <div>
            <div
              onMouseEnter={() => setEnrolledHover(true)}
              onMouseLeave={() => setEnrolledHover(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                background: enrolledHover ? "rgba(16,185,129,0.2)" : "rgba(16,185,129,0.1)",
                border: enrolledHover ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(16,185,129,0.2)",
                marginBottom: "16px",
                transform: enrolledHover ? "scale(1.04)" : "scale(1)",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#10b981" }}>Currently Enrolled</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Sir Syed University of Engineering & Technology</h2>
            <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#94a3b8", margin: "0 0 4px" }}>BS Computer Science</h3>
            <p style={{ fontSize: "15px", color: "#64748b", margin: "0 0 24px" }}>Completed 6th Semester</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {[
                { label: "Duration", value: "2023 to 2027" },
                { label: "Status", value: "Completed 6th Semester" },
                { label: "Location", value: "Pakistan" },
              ].map((item) => (
                <EduInfoItemPill key={item.label} item={item} />
              ))}
            </div>
          </div>
          <EduCgpaBadge />
        </div>
      </div>
    </div>
  );
}

function EduInfoItemPill({ item }: { item: { label: string; value: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 16px",
        background: hovered ? "rgba(25, 25, 32, 0.9)" : "rgba(20, 20, 25, 0.6)",
        border: `1px solid ${hovered ? "rgba(56, 189, 248, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "12px",
        transform: hovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 8px 20px -6px rgba(56, 189, 248, 0.2)" : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500, marginBottom: "2px" }}>{item.label}</div>
      <div style={{ fontSize: "14px", color: "#f1f5f9", fontWeight: 600 }}>{item.value}</div>
    </div>
  );
}

function EduCgpaBadge() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: "center",
        padding: "28px 36px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "20px",
        transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 14px 32px -8px rgba(16, 185, 129, 0.25)" : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        minWidth: "160px",
        cursor: "default",
      }}
      className="edu-cgpa-badge"
    >
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "2px", marginBottom: "8px" }}>CGPA</div>
      <div style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "48px", fontWeight: 800, background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>3.97</div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>/ 4.0</div>
      <div style={{ marginTop: "12px", padding: "4px 10px", background: "rgba(16,185,129,0.2)", borderRadius: "100px", fontSize: "10px", fontWeight: 600, color: "#34d399" }}>Top 5%</div>
    </div>
  );
}
