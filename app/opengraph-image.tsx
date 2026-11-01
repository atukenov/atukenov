import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Almaz Tukenov — Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#07070d",
          backgroundImage:
            "radial-gradient(ellipse at 0% 0%, rgba(255,42,109,0.35), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(0,240,255,0.25), transparent 55%)",
          borderLeft: "12px solid #f3e600",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#00f0ff",
            letterSpacing: 4,
          }}
        >
          AMAKENZI_
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            color: "#f3e600",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          Almaz Tukenov
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Full-Stack Software Engineer
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: "#ff2a6d",
          }}
        >
          React · Node.js · .NET · Next.js
        </div>
      </div>
    ),
    { ...size }
  );
}
