import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Atlas Command Center";

const INK = "#070707";
const RUST = "#FF3B1F";
const WHITE = "#ECECEC";
const GREY = "#8A8A8A";
const DIM = "#5B5B5B";

const STATS = [
  { value: "8", label: "Domains" },
  { value: "3D", label: "Interactive" },
  { value: "GLSL", label: "Custom shaders" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "10px",
            height: "100%",
            backgroundColor: RUST,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "24px",
            letterSpacing: "6px",
            color: DIM,
          }}
        >
          <div style={{ display: "flex" }}>{`${site.alias.toUpperCase()} / ATL-01`}</div>
          <div style={{ display: "flex", color: RUST }}>· FLAGSHIP</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              color: WHITE,
              lineHeight: 0.98,
              letterSpacing: "-3px",
            }}
          >
            Atlas Command Center
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: GREY,
              marginTop: "28px",
              lineHeight: 1.35,
              maxWidth: "980px",
            }}
          >
            A physical-digital command interface for AI, automation and environment.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: "56px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: "44px", color: WHITE }}>{s.value}</div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "20px",
                    fontFamily: "monospace",
                    letterSpacing: "3px",
                    color: DIM,
                    marginTop: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontFamily: "monospace",
              letterSpacing: "4px",
              color: GREY,
            }}
          >
            jotachaves.dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
