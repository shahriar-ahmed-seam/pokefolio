import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} · ${profile.epithet}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(120% 90% at 50% -10%, #3a1010 0%, #080b16 55%)",
          color: "#ffcb05",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 12, color: "#e3350d", fontWeight: 700 }}>POKÉFOLIO</div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            marginTop: 12,
            background: "linear-gradient(120deg,#ffcb05,#e3350d,#ffcb05)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 32, letterSpacing: 6, color: "#eaf0ff", marginTop: 8 }}>{profile.epithet.toUpperCase()}</div>
        <div style={{ fontSize: 24, color: "#9aa6c4", marginTop: 26, maxWidth: 860, textAlign: "center" }}>{profile.tagline}</div>
      </div>
    ),
    size
  );
}
