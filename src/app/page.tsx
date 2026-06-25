import { Answer } from "@/components/answer";
import { getWeather, pickRandom, STATES, TEMP_THRESHOLD } from "@/lib/answers";

export const revalidate = 600;

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
