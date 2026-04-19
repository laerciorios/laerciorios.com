import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Laercio Rios — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSpaceMono() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible)" } }
    ).then((r) => r.text());

    const urls = [...css.matchAll(/src: url\((.+?)\) format/g)].map((m) => m[1]);
    if (!urls.length) return [];

    const buffers = await Promise.all(
      urls.map((url) => fetch(url).then((r) => r.arrayBuffer()))
    );

    return [
      { name: "Space Mono", data: buffers[0], style: "normal" as const, weight: 400 as const },
      ...(buffers[1]
        ? [{ name: "Space Mono", data: buffers[1], style: "normal" as const, weight: 700 as const }]
        : []),
    ];
  } catch {
    return [];
  }
}

export default async function Image() {
  const fonts = await loadSpaceMono();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#0d0000",
          fontFamily: "Space Mono, monospace",
          position: "relative",
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "10px",
            backgroundColor: "#e14a5d",
            display: "flex",
          }}
        />

        {/* Subtle grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #3a2229 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.35,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px 64px 96px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Top block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div
              style={{
                fontSize: "90px",
                fontWeight: 700,
                color: "#f9e9ea",
                letterSpacing: "-3px",
                lineHeight: 1,
                display: "flex",
              }}
            >
              LAERCIO RIOS
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "32px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  backgroundColor: "#e14a5d",
                  display: "flex",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#e14a5d",
                  display: "flex",
                }}
              >
                Software Engineer
              </div>
            </div>

            <div
              style={{
                fontSize: "24px",
                color: "#ccb9bd",
                marginTop: "16px",
                display: "flex",
              }}
            >
              Full Stack Developer · Portfolio, Projects &amp; Articles
            </div>
          </div>

          {/* Bottom: URL */}
          <div
            style={{
              fontSize: "20px",
              color: "#8f7d82",
              display: "flex",
              letterSpacing: "0.05em",
            }}
          >
            laerciorios.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
