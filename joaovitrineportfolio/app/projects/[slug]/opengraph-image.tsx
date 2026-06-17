import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project artifact card";

// Pre-render an OG card for each project served by this dynamic route.
// Featured projects (atlas-command-center) have their own route + OG image.
export function generateStaticParams() {
  return projects.filter((p) => !p.featured).map((p) => ({ slug: p.slug }));
}

const INK = "#070707";
const RUST = "#FF3B1F";
const WHITE = "#ECECEC";
const GREY = "#8A8A8A";
const DIM = "#5B5B5B";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project?.title ?? site.alias;
  const subtitle = project?.outcome ?? project?.tagline ?? site.description;
  const index = project?.index ?? "00";
  const status = (project?.status ?? "live").toUpperCase();
  const kpis = project?.kpis?.slice(0, 3) ?? [];

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
        {/* rust spine */}
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

        {/* top row */}
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
          <div style={{ display: "flex" }}>{`${site.alias.toUpperCase()} / ARTIFACT ${index}`}</div>
          <div style={{ display: "flex", color: RUST }}>{`· ${status}`}</div>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 700,
              color: WHITE,
              lineHeight: 1.02,
              letterSpacing: "-2px",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: GREY,
              marginTop: "28px",
              lineHeight: 1.35,
              maxWidth: "960px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: "56px" }}>
            {kpis.map((k) => (
              <div key={k.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: "44px", color: WHITE }}>{k.value}</div>
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
                  {k.label}
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
