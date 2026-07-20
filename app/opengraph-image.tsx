import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const profileData = readFileSync(join(process.cwd(), "public/profile-image.jpg"));
  const profileSrc = `data:image/jpeg;base64,${profileData.toString("base64")}`;

  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #050505 0%, #0a1a0a 40%, #050505 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 72px",
          gap: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* left glow */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: 400, height: "100%",
          background: "radial-gradient(ellipse at left center, rgba(0,255,136,0.08) 0%, transparent 70%)",
        }} />

        {/* Profile photo */}
        <div style={{
          display: "flex", flexShrink: 0,
          borderRadius: 28,
          overflow: "hidden",
          border: "2.5px solid rgba(0,255,136,0.5)",
          boxShadow: "0 0 60px rgba(0,255,136,0.2)",
          width: 240,
          height: 290,
        }}>
          <img src={profileSrc} width={240} height={290}
            style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 0 }}>
          {/* Logo + eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <img src={logoSrc} width={36} height={36}
              style={{ borderRadius: 10, objectFit: "cover" }} />
            <span style={{ color: "#00FF88", fontSize: 14, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <div style={{ color: "#ffffff", fontSize: 56, fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 10 }}>
            Freelancer Mizan
          </div>

          {/* Role */}
          <div style={{ color: "#888888", fontSize: 22, marginBottom: 36 }}>
            {"Social Media Manager & Digital Marketer"}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { v: "1000+", l: "Videos Ranked #1" },
              { v: "200+", l: "Creators Helped" },
              { v: "5+",    l: "Years Experience" },
              { v: "50+",  l: "5-Star Reviews" },
            ].map((s) => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ color: "#00FF88", fontSize: 30, fontWeight: 800,
                  letterSpacing: "-0.01em" }}>{s.v}</span>
                <span style={{ color: "#555555", fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div style={{ marginTop: 30, color: "#333333", fontSize: 15 }}>
            freelancermizan.com
          </div>
        </div>

        {/* right glow */}
        <div style={{
          position: "absolute", right: 0, bottom: 0, width: 300, height: 300,
          background: "radial-gradient(ellipse at right bottom, rgba(0,255,136,0.06) 0%, transparent 70%)",
        }} />

        {/* bottom green line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #00FF88, transparent)",
        }} />
      </div>
    ),
    { ...size }
  );
}
