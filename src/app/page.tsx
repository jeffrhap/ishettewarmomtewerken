import type { Metadata } from "next";
import { Answer } from "@/components/answer";
import { getWeather, pickRandom, STATES, TEMP_THRESHOLD } from "@/lib/answers";

export const revalidate = 300;

// Title + social card reflect today's verdict. On fetch failure we return {} so
// the route inherits the evergreen metadata from the root layout.
// openGraph/twitter are shallow-replaced (not deep-merged), so the inherited
// fields we still want (type/locale/url/siteName) are restated here.
export async function generateMetadata(): Promise<Metadata> {
  const weather = await getWeather();
  if (weather === null) return {};

  const isWarm = weather.temperature >= TEMP_THRESHOLD;
  const temp = Math.round(weather.temperature);
  const title = isWarm
    ? "JA — het is te warm om te werken 🔥"
    : "NEE — gewoon werken vandaag ☕";
  const description = isWarm
    ? `Het is ${temp}°C in De Bilt. Officieel te warm om te werken — klap die laptop dicht.`
    : `Het is ${temp}°C in De Bilt. Niet te warm, dus geen excuus. Aan de slag.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: "/",
      siteName: "Is het te warm om te werken?",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Home() {
  const weather = await getWeather();
  const isWarm = weather !== null && weather.temperature >= TEMP_THRESHOLD;
  const content = STATES[isWarm ? "warm" : "cool"];
  const initialLine = weather === null ? null : pickRandom(content.lines);

  return (
    <Answer
      weather={weather}
      isWarm={isWarm}
      content={content}
      initialLine={initialLine}
    />
  );
}
