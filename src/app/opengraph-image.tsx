import { ImageResponse } from "next/og";
import { getWeather, TEMP_THRESHOLD } from "@/lib/answers";

export const alt =
  "Is het te warm om te werken? Het dagelijkse oordeel op basis van de temperatuur in Nederland.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 300;

// Brand card reflecting today's verdict (JA / NEE), or the evergreen question
// when the temperature can't be fetched.
export default async function Image() {
  const weather = await getWeather();
  const temperature = weather?.temperature ?? null;
  const isWarm = temperature !== null && temperature >= TEMP_THRESHOLD;

  const gradient = isWarm
    ? "linear-gradient(152deg,#FF7A18 16%,#E53600 84%)"
    : "linear-gradient(152deg,#2E9BE6 16%,#1452C9 84%)";
  const liquid = isWarm ? "#C21500" : "#1452C9";
  const eyebrow = temperature !== null ? "HET OORDEEL · VANDAAG" : "HET OORDEEL · ELKE DAG";
  const verdict = temperature === null ? null : isWarm ? "JA." : "NEE";
  const headline =
    temperature === null
      ? "Is het te warm om te werken?"
      : isWarm
        ? "Het is te warm om te werken."
        : "Het is niet te warm om te werken.";
  const subline =
    temperature !== null
      ? `${Math.round(temperature)}°C in De Bilt`
      : "Niet wetenschappelijk. Wel waar.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#ffffff",
          background: gradient,
          fontFamily: "sans-serif",
        }}
      >
        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {eyebrow}
          </div>
          {verdict ? (
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, marginTop: 8 }}>
              {verdict}
            </div>
          ) : null}
          <div
            style={{
              fontSize: verdict ? 44 : 72,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: verdict ? 0 : 24,
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)", marginTop: 24 }}>
            {subline}
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 40 }}>
            ishettewarmomtewerken.nl
          </div>
        </div>

        {/* Thermometer */}
        <div style={{ position: "relative", display: "flex", width: 150, height: 420 }}>
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 0,
              width: 40,
              height: 330,
              borderRadius: 20,
              background: "rgba(255,255,255,0.25)",
              border: "3px solid rgba(255,255,255,0.55)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 150,
              width: 24,
              height: 200,
              borderRadius: 12,
              background: liquid,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 35,
              top: 300,
              width: 80,
              height: 80,
              borderRadius: 40,
              background: liquid,
              border: "3px solid rgba(255,255,255,0.55)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
