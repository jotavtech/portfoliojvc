import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#070707",
          color: "#E8E8E8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9A9A9A",
          }}
        >
          <span style={{ width: 10, height: 10, background: "#FF3B1F" }} />
          <span>jotavtech · NODE_27.12</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#6E6E6E",
            }}
          >
            FULLSTACK · DESIGN ENGINEER
          </div>
          <div
            style={{
              fontSize: 160,
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: -4,
              color: "#E8E8E8",
            }}
          >
            JOÃO VITOR
            <br />
            CHAVES
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6E6E6E",
          }}
        >
          <span>portfolio · 3.0 · industrial release</span>
          <span style={{ color: "#FF3B1F" }}>jp · br</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
